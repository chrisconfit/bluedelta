'use strict';
var rfr = require('rfr');
var logger = rfr('util/logger');
var config = rfr('config');
var AWS = config.AWS;
var fs = require('fs');
var cf = rfr('/util/cloudFormation');
var async = require('async');

function uploadLambdaZipToS3() {
  return cf.getStackOutputs().then((cfOutputs) => {
    return {
      Bucket: cfOutputs.LambdaBucket,
      Key: config.getLambdaZipName(),
      Body: fs.createReadStream(config.getLambdaZipPath())
    };
  }).then((params) => {
    return putS3Object(params);
  });
}

function putS3Object(params) {
  var stats = fs.statSync(config.getLambdaZipPath())
  var fileSizeInBytes = stats["size"]

  if(fileSizeInBytes < (1024*1024*5)) {
    return new Promise((resolve, reject) => {
      var s3obj = new AWS.S3({params: params});
      s3obj.upload({Body: params.Body}, function(err, data) {
        if (err) {
          reject(err);
          return;
        }
        logger.info('Successfully uploaded Lambda code to ' + params.Key);
        logger.info('Uploaded Lambda zip as s3://' + params.Bucket + '/' + params.Key);
        resolve(data);
      });
    });
  }else{
    return new Promise((resolve, reject) => {
      var s3obj = new AWS.S3({params: params});
      s3obj.createMultipartUpload({ Bucket: params.Bucket, Key: params.Key},
        (mpErr, multipart) => {
          if(!mpErr){
            //console.log("multipart created", multipart.UploadId);
            fs.readFile(config.getLambdaZipPath(), (err, fileData) => {

              var partSize = 1024 * 1024 * 5;
              var parts = Math.ceil(fileData.length / partSize);

              async.timesSeries(parts, (partNum, next) => {

                var rangeStart = partNum*partSize;
                var end = Math.min(rangeStart + partSize, fileData.length);

                logger.info("Uploading ", config.getLambdaZipName(), (100 * partNum/parts).toFixed(2), "%");

                partNum++;
                async.retry((retryCb) => {
                  s3obj.uploadPart({
                    Body: fileData.slice(rangeStart, end),
                    Bucket: params.Bucket,
                    Key: params.Key,
                    PartNumber: partNum,
                    UploadId: multipart.UploadId
                  }, (err, mData) => {
                    retryCb(err, mData);
                  });
                }, (err, data)  => {
                  //console.log(data);
                  next(err, {ETag: data.ETag, PartNumber: partNum});
                });

              }, (err, dataPacks) => {
                s3obj.completeMultipartUpload({
                  Bucket: params.Bucket,
                  Key: params.Key,
                  MultipartUpload: {
                    Parts: dataPacks
                  },
                  UploadId: multipart.UploadId
                }, function(err, data) {
                  if (err) {
                    reject(err);
                  }

                  logger.info('Successfully uploaded Lambda code to ' + params.Key);
                  logger.info('Uploaded Lambda zip as s3://' + params.Bucket + '/' + params.Key);
                  resolve(data);
                });
              });
            });
          }else{
            reject(mpErr);
          }
        });
    });
  //   uploadMultipart(absoluteFilePath, fileName, uploadCb)
  }
}

function emptyBucket(bucketName) {
  return new Promise((resolve, reject) => {
    listObjects(bucketName).then((objectKeys) => {
      deleteObjects(bucketName, objectKeys).then((result) => {
        resolve(result);
      })
    }).catch((err) => {
      logger.error(err);
      reject(err);
    })
  })
}

function listObjects(bucketName) {
  return new Promise((resolve, reject) => {
    var objectKeys = [];
    var s3 = new AWS.S3();
    let params = {
      Bucket: bucketName
    };
    s3.listObjectsV2(params, function(err, data) {
      if (err) {
        logger.error(err);
        reject(err);
      }
      let objects = [];
      if (data && data.Contents) {
        objects = data.Contents;
      }
      for (let i = 0; i < objects.length; i++) {
        objectKeys.push(
          {
            Key: objects[i].Key
          }
        );
      }
      resolve(objectKeys);
    });
  });
}

function deleteObjects(bucketName, objectKeys) {
  return new Promise((resolve, reject) => {
    var s3 = new AWS.S3();
    if (objectKeys.length === 0) {
      // Bucket is already empty. There are no objects to delete
      resolve();
      return;
    }
    let params = {
      Bucket: bucketName,
      Delete: {
        Objects: objectKeys
      }
    };
    s3.deleteObjects(params, function (err, data) {
      if (err) {
        logger.error(err);
        reject(err);
        return;
      }
      resolve(data);
    })
  });
}

module.exports = {
  uploadLambdaZipToS3,
  emptyBucket
};
