'use strict';
var rfr = require('rfr');
var app = rfr('lambda/app');
var chai = require('chai');
var expect = chai.expect;
/* jshint -W024 */
/* jshint expr:true */
describe('Create Get Update Delete', function() {

  before((done) => {
    app.handler(
        {
            resource: '/buttons',
            path: '/buttons',
            httpMethod: 'POST',
            headers: {
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, sdch, br',
                'Accept-Language': 'en-US,en;q=0.8',
                Authorization: 'eyJraWQiOiJ3NkphUVNoaXpYRU5yaGRqZXpLQkhCWGhXMWtYRzByb056WllSWjZaNlpZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDBkMDk2Zi0yNzVlLTQ5NGUtYTM5OC1hODQ4MDdlZTliMTAiLCJjb2duaXRvOmdyb3VwcyI6WyJjbGllbnRHcm91cCJdLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06Ojg0MDI3Mjk3NzUwNzpyb2xlXC9ibHVlLWRlbHRhLWFwaS1kZXZlbG9wbWVuLUNvZ25pdG9JZGVudGl0eVBvb2xBdXRoUy0zNks1OERUVFBLSEkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VdlZlTm9lNXoiLCJjb2duaXRvOnVzZXJuYW1lIjoidXNlcjEiLCJnaXZlbl9uYW1lIjoiU2FtcGxlIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6ODQwMjcyOTc3NTA3OnJvbGVcL2JsdWUtZGVsdGEtYXBpLWRldmVsb3BtZW4tQ29nbml0b0lkZW50aXR5UG9vbEF1dGhTLTM2SzU4RFRUUEtISSJdLCJhdWQiOiI2aGRycGsxajIwcW1qaGZkaWdhMzF1aWE4MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNDk2ODAzNDkxLCJleHAiOjE0OTY4MDcwOTEsImlhdCI6MTQ5NjgwMzQ5MSwiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSJ9.RR6AaM8n7IrpjEynrRV3Qq_-OvA7bZHdKry0xPcg0w0gCr7PcBt0ae0D9MO-zO5YLxuag22L79SKWxG2niYcTiKKTkbB3VQ46j4TmqAqjsy6N-GvFY34V8w_1E-xKgh9kyJFIi5ynLwmSrNe2e1_oQWsRxg9TeH_w4dMNPHGnNHedgLr1c5j3cercqDQm34WdixDxBEZULpsq6VaoMMaNoPJYWsx1Jm7G_CjNIAaYBQ_YJvkFkYIkHd6i_nbRK5AANuF-awngo82_SaTpi4ThRkd-1pEl96kKseVPTo47a2d6MZ4Cgk61MEKdxhuc7kyKCdmdi7ndPGeE4PoxfTuCg',
                'CloudFront-Forwarded-Proto': 'https',
                'CloudFront-Is-Desktop-Viewer': 'true',
                'CloudFront-Is-Mobile-Viewer': 'false',
                'CloudFront-Is-SmartTV-Viewer': 'false',
                'CloudFront-Is-Tablet-Viewer': 'false',
                'CloudFront-Viewer-Country': 'US',
                Host: 'kd6f1omjzc.execute-api.us-east-1.amazonaws.com',
                origin: 'http://localhost:8100',
                Referer: 'http://localhost:8100/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                Via: '2.0 f5092a68b383f246bb47f4dc5ee056b1.cloudfront.net (CloudFront)',
                'X-Amz-Cf-Id': 'LkzxyMoGwybzd1BC_ed5rp3ZaXgCBfmwvtYMekTNEzXhlPPX15iP5g==',
                'X-Amzn-Trace-Id': 'Root=1-593768a7-292ac3be5cd6ae8222bfed4a',
                'X-Forwarded-For': '173.235.15.78, 204.246.174.162',
                'X-Forwarded-Port': '443',
                'X-Forwarded-Proto': 'https'
            },
            queryStringParameters: null,
            pathParameters: {
            },
            stageVariables: null,
            requestContext: {
                path: '/development/buttons',
                accountId: '840272977507',
                resourceId: 'iuyhye',
                stage: 'development',
                authorizer: { claims: [Object] },
                requestId: '49e7e398-4b2b-11e7-ab35-4574905eabd8',
                identity: {
                    cognitoIdentityPoolId: null,
                    accountId: null,
                    cognitoIdentityId: null,
                    caller: null,
                    apiKey: '',
                    sourceIp: '173.235.15.78',
                    accessKey: null,
                    cognitoAuthenticationType: null,
                    cognitoAuthenticationProvider: null,
                    userArn: null,
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                    user: null
                },
                resourcePath: '/buttons',
                httpMethod: 'POST',
                apiId: 'kd6f1omjzc'
            },
            body: JSON.stringify({
                name: 'Button1',
            }),
            isBase64Encoded: false
        },
      {
      // Empty context object for testing purposes
      },
      // Callback anonymous function for Lambda Node 4.3 runtime
      (err, out) => {
        let data = JSON.parse(out.body);
        expect(err).to.not.exist;
        expect(data.buttonId).to.exist;
        this.buttonId = data.buttonId;
        done();
      }
    );
  });
  it('Get and Update value', (done) => {
    app.handler(
        {
            resource: '/buttons/{buttonId}',
            path: '/buttons/' + this.buttonId,
            httpMethod: 'GET',
            headers: {
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, sdch, br',
                'Accept-Language': 'en-US,en;q=0.8',
                Authorization: 'eyJraWQiOiJ3NkphUVNoaXpYRU5yaGRqZXpLQkhCWGhXMWtYRzByb056WllSWjZaNlpZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDBkMDk2Zi0yNzVlLTQ5NGUtYTM5OC1hODQ4MDdlZTliMTAiLCJjb2duaXRvOmdyb3VwcyI6WyJjbGllbnRHcm91cCJdLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06Ojg0MDI3Mjk3NzUwNzpyb2xlXC9ibHVlLWRlbHRhLWFwaS1kZXZlbG9wbWVuLUNvZ25pdG9JZGVudGl0eVBvb2xBdXRoUy0zNks1OERUVFBLSEkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VdlZlTm9lNXoiLCJjb2duaXRvOnVzZXJuYW1lIjoidXNlcjEiLCJnaXZlbl9uYW1lIjoiU2FtcGxlIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6ODQwMjcyOTc3NTA3OnJvbGVcL2JsdWUtZGVsdGEtYXBpLWRldmVsb3BtZW4tQ29nbml0b0lkZW50aXR5UG9vbEF1dGhTLTM2SzU4RFRUUEtISSJdLCJhdWQiOiI2aGRycGsxajIwcW1qaGZkaWdhMzF1aWE4MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNDk2ODAzNDkxLCJleHAiOjE0OTY4MDcwOTEsImlhdCI6MTQ5NjgwMzQ5MSwiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSJ9.RR6AaM8n7IrpjEynrRV3Qq_-OvA7bZHdKry0xPcg0w0gCr7PcBt0ae0D9MO-zO5YLxuag22L79SKWxG2niYcTiKKTkbB3VQ46j4TmqAqjsy6N-GvFY34V8w_1E-xKgh9kyJFIi5ynLwmSrNe2e1_oQWsRxg9TeH_w4dMNPHGnNHedgLr1c5j3cercqDQm34WdixDxBEZULpsq6VaoMMaNoPJYWsx1Jm7G_CjNIAaYBQ_YJvkFkYIkHd6i_nbRK5AANuF-awngo82_SaTpi4ThRkd-1pEl96kKseVPTo47a2d6MZ4Cgk61MEKdxhuc7kyKCdmdi7ndPGeE4PoxfTuCg',
                'CloudFront-Forwarded-Proto': 'https',
                'CloudFront-Is-Desktop-Viewer': 'true',
                'CloudFront-Is-Mobile-Viewer': 'false',
                'CloudFront-Is-SmartTV-Viewer': 'false',
                'CloudFront-Is-Tablet-Viewer': 'false',
                'CloudFront-Viewer-Country': 'US',
                Host: 'kd6f1omjzc.execute-api.us-east-1.amazonaws.com',
                origin: 'http://localhost:8100',
                Referer: 'http://localhost:8100/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                Via: '2.0 f5092a68b383f246bb47f4dc5ee056b1.cloudfront.net (CloudFront)',
                'X-Amz-Cf-Id': 'LkzxyMoGwybzd1BC_ed5rp3ZaXgCBfmwvtYMekTNEzXhlPPX15iP5g==',
                'X-Amzn-Trace-Id': 'Root=1-593768a7-292ac3be5cd6ae8222bfed4a',
                'X-Forwarded-For': '173.235.15.78, 204.246.174.162',
                'X-Forwarded-Port': '443',
                'X-Forwarded-Proto': 'https'
            },
            queryStringParameters: null,
            pathParameters: {
                buttonId: this.buttonId
            },
            stageVariables: null,
            requestContext: {
                path: '/development/buttons/' + this.buttonId,
                accountId: '840272977507',
                resourceId: 'iuyhye',
                stage: 'development',
                authorizer: { claims: [Object] },
                requestId: '49e7e398-4b2b-11e7-ab35-4574905eabd8',
                identity: {
                    cognitoIdentityPoolId: null,
                    accountId: null,
                    cognitoIdentityId: null,
                    caller: null,
                    apiKey: '',
                    sourceIp: '173.235.15.78',
                    accessKey: null,
                    cognitoAuthenticationType: null,
                    cognitoAuthenticationProvider: null,
                    userArn: null,
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                    user: null
                },
                resourcePath: '/buttons/{buttonId}',
                httpMethod: 'GET',
                apiId: 'kd6f1omjzc'
            },
            body: null,
            isBase64Encoded: false
        },
        {}, (err, out) => {
        let data = JSON.parse(out.body);
        expect(err).to.not.exist;
        expect(data.buttonId).to.be.eql(this.buttonId);
        expect(data.name).to.be.eql('Button1');
        app.handler(
            {
                resource: '/buttons/{buttonId}',
                path: '/buttons/' + this.buttonId,
                httpMethod: 'POST',
                headers: {
                    Accept: '*/*',
                    'Accept-Encoding': 'gzip, deflate, sdch, br',
                    'Accept-Language': 'en-US,en;q=0.8',
                    Authorization: 'eyJraWQiOiJ3NkphUVNoaXpYRU5yaGRqZXpLQkhCWGhXMWtYRzByb056WllSWjZaNlpZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDBkMDk2Zi0yNzVlLTQ5NGUtYTM5OC1hODQ4MDdlZTliMTAiLCJjb2duaXRvOmdyb3VwcyI6WyJjbGllbnRHcm91cCJdLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06Ojg0MDI3Mjk3NzUwNzpyb2xlXC9ibHVlLWRlbHRhLWFwaS1kZXZlbG9wbWVuLUNvZ25pdG9JZGVudGl0eVBvb2xBdXRoUy0zNks1OERUVFBLSEkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VdlZlTm9lNXoiLCJjb2duaXRvOnVzZXJuYW1lIjoidXNlcjEiLCJnaXZlbl9uYW1lIjoiU2FtcGxlIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6ODQwMjcyOTc3NTA3OnJvbGVcL2JsdWUtZGVsdGEtYXBpLWRldmVsb3BtZW4tQ29nbml0b0lkZW50aXR5UG9vbEF1dGhTLTM2SzU4RFRUUEtISSJdLCJhdWQiOiI2aGRycGsxajIwcW1qaGZkaWdhMzF1aWE4MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNDk2ODAzNDkxLCJleHAiOjE0OTY4MDcwOTEsImlhdCI6MTQ5NjgwMzQ5MSwiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSJ9.RR6AaM8n7IrpjEynrRV3Qq_-OvA7bZHdKry0xPcg0w0gCr7PcBt0ae0D9MO-zO5YLxuag22L79SKWxG2niYcTiKKTkbB3VQ46j4TmqAqjsy6N-GvFY34V8w_1E-xKgh9kyJFIi5ynLwmSrNe2e1_oQWsRxg9TeH_w4dMNPHGnNHedgLr1c5j3cercqDQm34WdixDxBEZULpsq6VaoMMaNoPJYWsx1Jm7G_CjNIAaYBQ_YJvkFkYIkHd6i_nbRK5AANuF-awngo82_SaTpi4ThRkd-1pEl96kKseVPTo47a2d6MZ4Cgk61MEKdxhuc7kyKCdmdi7ndPGeE4PoxfTuCg',
                    'CloudFront-Forwarded-Proto': 'https',
                    'CloudFront-Is-Desktop-Viewer': 'true',
                    'CloudFront-Is-Mobile-Viewer': 'false',
                    'CloudFront-Is-SmartTV-Viewer': 'false',
                    'CloudFront-Is-Tablet-Viewer': 'false',
                    'CloudFront-Viewer-Country': 'US',
                    Host: 'kd6f1omjzc.execute-api.us-east-1.amazonaws.com',
                    origin: 'http://localhost:8100',
                    Referer: 'http://localhost:8100/',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                    Via: '2.0 f5092a68b383f246bb47f4dc5ee056b1.cloudfront.net (CloudFront)',
                    'X-Amz-Cf-Id': 'LkzxyMoGwybzd1BC_ed5rp3ZaXgCBfmwvtYMekTNEzXhlPPX15iP5g==',
                    'X-Amzn-Trace-Id': 'Root=1-593768a7-292ac3be5cd6ae8222bfed4a',
                    'X-Forwarded-For': '173.235.15.78, 204.246.174.162',
                    'X-Forwarded-Port': '443',
                    'X-Forwarded-Proto': 'https'
                },
                queryStringParameters: null,
                pathParameters: {
                    buttonId: this.buttonId
                },
                stageVariables: null,
                requestContext: {
                    path: '/development/buttons/' + this.buttonId,
                    accountId: '840272977507',
                    resourceId: 'iuyhye',
                    stage: 'development',
                    authorizer: { claims: [Object] },
                    requestId: '49e7e398-4b2b-11e7-ab35-4574905eabd8',
                    identity: {
                        cognitoIdentityPoolId: null,
                        accountId: null,
                        cognitoIdentityId: null,
                        caller: null,
                        apiKey: '',
                        sourceIp: '173.235.15.78',
                        accessKey: null,
                        cognitoAuthenticationType: null,
                        cognitoAuthenticationProvider: null,
                        userArn: null,
                        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                        user: null
                    },
                    resourcePath: '/buttons/{buttonId}',
                    httpMethod: 'POST',
                    apiId: 'kd6f1omjzc'
                },
                body: JSON.stringify({
                    buttonId: this.buttonId,
                    name: 'Buttons-Renamed1',
                }),
                isBase64Encoded: false
            },
        {}, (err, out) => {
          expect(err).to.not.exist;
          let data = JSON.parse(out.body);
          expect(data.updateTime).to.exist;
          expect(data.buttonId).to.be.eql(this.buttonId);
          done();
        });
      }
    );
  });
  after((done) => {
    app.handler(
        {
            resource: '/buttons/{buttonId}',
            path: '/buttons/' + this.buttonId,
            httpMethod: 'DELETE',
            headers: {
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, sdch, br',
                'Accept-Language': 'en-US,en;q=0.8',
                Authorization: 'eyJraWQiOiJ3NkphUVNoaXpYRU5yaGRqZXpLQkhCWGhXMWtYRzByb056WllSWjZaNlpZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDBkMDk2Zi0yNzVlLTQ5NGUtYTM5OC1hODQ4MDdlZTliMTAiLCJjb2duaXRvOmdyb3VwcyI6WyJjbGllbnRHcm91cCJdLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06Ojg0MDI3Mjk3NzUwNzpyb2xlXC9ibHVlLWRlbHRhLWFwaS1kZXZlbG9wbWVuLUNvZ25pdG9JZGVudGl0eVBvb2xBdXRoUy0zNks1OERUVFBLSEkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VdlZlTm9lNXoiLCJjb2duaXRvOnVzZXJuYW1lIjoidXNlcjEiLCJnaXZlbl9uYW1lIjoiU2FtcGxlIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6ODQwMjcyOTc3NTA3OnJvbGVcL2JsdWUtZGVsdGEtYXBpLWRldmVsb3BtZW4tQ29nbml0b0lkZW50aXR5UG9vbEF1dGhTLTM2SzU4RFRUUEtISSJdLCJhdWQiOiI2aGRycGsxajIwcW1qaGZkaWdhMzF1aWE4MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNDk2ODAzNDkxLCJleHAiOjE0OTY4MDcwOTEsImlhdCI6MTQ5NjgwMzQ5MSwiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSJ9.RR6AaM8n7IrpjEynrRV3Qq_-OvA7bZHdKry0xPcg0w0gCr7PcBt0ae0D9MO-zO5YLxuag22L79SKWxG2niYcTiKKTkbB3VQ46j4TmqAqjsy6N-GvFY34V8w_1E-xKgh9kyJFIi5ynLwmSrNe2e1_oQWsRxg9TeH_w4dMNPHGnNHedgLr1c5j3cercqDQm34WdixDxBEZULpsq6VaoMMaNoPJYWsx1Jm7G_CjNIAaYBQ_YJvkFkYIkHd6i_nbRK5AANuF-awngo82_SaTpi4ThRkd-1pEl96kKseVPTo47a2d6MZ4Cgk61MEKdxhuc7kyKCdmdi7ndPGeE4PoxfTuCg',
                'CloudFront-Forwarded-Proto': 'https',
                'CloudFront-Is-Desktop-Viewer': 'true',
                'CloudFront-Is-Mobile-Viewer': 'false',
                'CloudFront-Is-SmartTV-Viewer': 'false',
                'CloudFront-Is-Tablet-Viewer': 'false',
                'CloudFront-Viewer-Country': 'US',
                Host: 'kd6f1omjzc.execute-api.us-east-1.amazonaws.com',
                origin: 'http://localhost:8100',
                Referer: 'http://localhost:8100/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                Via: '2.0 f5092a68b383f246bb47f4dc5ee056b1.cloudfront.net (CloudFront)',
                'X-Amz-Cf-Id': 'LkzxyMoGwybzd1BC_ed5rp3ZaXgCBfmwvtYMekTNEzXhlPPX15iP5g==',
                'X-Amzn-Trace-Id': 'Root=1-593768a7-292ac3be5cd6ae8222bfed4a',
                'X-Forwarded-For': '173.235.15.78, 204.246.174.162',
                'X-Forwarded-Port': '443',
                'X-Forwarded-Proto': 'https'
            },
            queryStringParameters: null,
            pathParameters: {
                buttonId: this.buttonId
            },
            stageVariables: null,
            requestContext: {
                path: '/development/buttons/' + this.buttonId,
                accountId: '840272977507',
                resourceId: 'iuyhye',
                stage: 'development',
                authorizer: { claims: [Object] },
                requestId: '49e7e398-4b2b-11e7-ab35-4574905eabd8',
                identity: {
                    cognitoIdentityPoolId: null,
                    accountId: null,
                    cognitoIdentityId: null,
                    caller: null,
                    apiKey: '',
                    sourceIp: '173.235.15.78',
                    accessKey: null,
                    cognitoAuthenticationType: null,
                    cognitoAuthenticationProvider: null,
                    userArn: null,
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                    user: null
                },
                resourcePath: '/buttons/{buttonId}',
                httpMethod: 'DELETE',
                apiId: 'kd6f1omjzc'
            },
            body: null,
            isBase64Encoded: false
        },
      {
       // Empty context object for testing
      },
      (err, data) => {
        console.log(JSON.stringify(err, null, 4));
        expect(err).to.not.exist;
        expect(JSON.parse(data.body)).to.be.eql({});
        done();
      }
    );
  });
});

describe('Buttons Not Found', function() {
  it('Get 404', (done) => {
    app.handler(
        {
            resource: '/buttons/{buttonId}',
            path: '/buttons/' + this.buttonId,
            httpMethod: 'DELETE',
            headers: {
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, sdch, br',
                'Accept-Language': 'en-US,en;q=0.8',
                Authorization: 'eyJraWQiOiJ3NkphUVNoaXpYRU5yaGRqZXpLQkhCWGhXMWtYRzByb056WllSWjZaNlpZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjZDBkMDk2Zi0yNzVlLTQ5NGUtYTM5OC1hODQ4MDdlZTliMTAiLCJjb2duaXRvOmdyb3VwcyI6WyJjbGllbnRHcm91cCJdLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06Ojg0MDI3Mjk3NzUwNzpyb2xlXC9ibHVlLWRlbHRhLWFwaS1kZXZlbG9wbWVuLUNvZ25pdG9JZGVudGl0eVBvb2xBdXRoUy0zNks1OERUVFBLSEkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9VdlZlTm9lNXoiLCJjb2duaXRvOnVzZXJuYW1lIjoidXNlcjEiLCJnaXZlbl9uYW1lIjoiU2FtcGxlIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6ODQwMjcyOTc3NTA3OnJvbGVcL2JsdWUtZGVsdGEtYXBpLWRldmVsb3BtZW4tQ29nbml0b0lkZW50aXR5UG9vbEF1dGhTLTM2SzU4RFRUUEtISSJdLCJhdWQiOiI2aGRycGsxajIwcW1qaGZkaWdhMzF1aWE4MCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNDk2ODAzNDkxLCJleHAiOjE0OTY4MDcwOTEsImlhdCI6MTQ5NjgwMzQ5MSwiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ1c2VyMUBleGFtcGxlLmNvbSJ9.RR6AaM8n7IrpjEynrRV3Qq_-OvA7bZHdKry0xPcg0w0gCr7PcBt0ae0D9MO-zO5YLxuag22L79SKWxG2niYcTiKKTkbB3VQ46j4TmqAqjsy6N-GvFY34V8w_1E-xKgh9kyJFIi5ynLwmSrNe2e1_oQWsRxg9TeH_w4dMNPHGnNHedgLr1c5j3cercqDQm34WdixDxBEZULpsq6VaoMMaNoPJYWsx1Jm7G_CjNIAaYBQ_YJvkFkYIkHd6i_nbRK5AANuF-awngo82_SaTpi4ThRkd-1pEl96kKseVPTo47a2d6MZ4Cgk61MEKdxhuc7kyKCdmdi7ndPGeE4PoxfTuCg',
                'CloudFront-Forwarded-Proto': 'https',
                'CloudFront-Is-Desktop-Viewer': 'true',
                'CloudFront-Is-Mobile-Viewer': 'false',
                'CloudFront-Is-SmartTV-Viewer': 'false',
                'CloudFront-Is-Tablet-Viewer': 'false',
                'CloudFront-Viewer-Country': 'US',
                Host: 'kd6f1omjzc.execute-api.us-east-1.amazonaws.com',
                origin: 'http://localhost:8100',
                Referer: 'http://localhost:8100/',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                Via: '2.0 f5092a68b383f246bb47f4dc5ee056b1.cloudfront.net (CloudFront)',
                'X-Amz-Cf-Id': 'LkzxyMoGwybzd1BC_ed5rp3ZaXgCBfmwvtYMekTNEzXhlPPX15iP5g==',
                'X-Amzn-Trace-Id': 'Root=1-593768a7-292ac3be5cd6ae8222bfed4a',
                'X-Forwarded-For': '173.235.15.78, 204.246.174.162',
                'X-Forwarded-Port': '443',
                'X-Forwarded-Proto': 'https'
            },
            queryStringParameters: null,
            pathParameters: {
                buttonId: this.buttonId
            },
            stageVariables: null,
            requestContext: {
                path: '/development/buttons/' + this.buttonId,
                accountId: '840272977507',
                resourceId: 'iuyhye',
                stage: 'development',
                authorizer: { claims: [Object] },
                requestId: '49e7e398-4b2b-11e7-ab35-4574905eabd8',
                identity: {
                    cognitoIdentityPoolId: null,
                    accountId: null,
                    cognitoIdentityId: null,
                    caller: null,
                    apiKey: '',
                    sourceIp: '173.235.15.78',
                    accessKey: null,
                    cognitoAuthenticationType: null,
                    cognitoAuthenticationProvider: null,
                    userArn: null,
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
                    user: null
                },
                resourcePath: '/buttons/{buttonId}',
                httpMethod: 'DELETE',
                apiId: 'kd6f1omjzc'
            },
            body: null,
            isBase64Encoded: false
        },
      {
        // Empty context object for testing purposes
      },
      (err, out) => {
        console.log(out);
        expect(err).to.not.exist;
        expect(out.statusCode).to.be.eql(404);
        done();
      });
  });

  // it('Update 404', (done) => {
  //   app.handler(
  //     {
  //       operation: 'com.hatboysoftware.blue-delta.buttons-Update',
  //       buttonId: 'buttonId',
  //       body: JSON.stringify({
  //         buttonId: 'someId',
  //         properties: {
  //         },
  //       }),
  //       params: {
  //         buttonId: 'someId',
  //       },
  //     },
  //     {
  //       // Empty context object for testing purposes
  //     },
  //     (err, out) => {
  //       console.log(out);
  //       expect(err).to.not.exist;
  //       expect(out.statusCode).to.be.eql(404);
  //       done();
  //     });
  // });
  //
  // it('Delete 404', (done) => {
  //   app.handler(
  //     {
  //       operation: 'com.hatboysoftware.blue-delta.buttons-Delete',
  //       buttonId: 'buttonId',
  //       params: {
  //         buttonId: 'someId',
  //       },
  //     },
  //     {
  //       // Empty context object for testing purposes
  //     },
  //     (err, out) => {
  //       console.log(out);
  //       expect(err).to.not.exist;
  //       expect(out.statusCode).to.be.eql(404);
  //       done();
  //     });
  // });
});
