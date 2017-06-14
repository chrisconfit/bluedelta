'use strict';
var rfr = require('rfr');
var app = rfr('lambda/app');
var cognito_trigger = rfr('lambda/cognito_trigger');
var chai = require('chai');
var expect = chai.expect;
/* jshint -W024 */
/* jshint expr:true */

describe('Create Update via Cognito Sync', function() {

    before((done) => {
        cognito_trigger.handler(
            {
                version: '1',
                region: 'us-east-1',
                userPoolId: 'us-east-1_UvVeNoe5z',
                userName: 'hatboyzero2',
                callerContext:
                {
                    awsSdkVersion: 'aws-sdk-js-2.6.4',
                    clientId: '6hdrpk1j20qmjhfdiga31uia80',
                },
                triggerSource: 'PostConfirmation_ConfirmSignUp',
                request:
                {
                    userAttributes:
                    {
                        sub: '7a2fbb4d-479b-4be1-a756-d12da10c7aee',
                        'cognito:user_status': 'CONFIRMED',
                        email_verified: 'true',
                        given_name: 'Matthew',
                        family_name: 'Gray',
                        email: 'mgray@hatboysoftware.com',
                    },
                },
                response:
                {

                },
            },
            {
                // Empty context object for testing purposes
            },
            (err, out) => {
                expect(err).to.not.exist;
                this.identityId = '7a2fbb4d-479b-4be1-a756-d12da10c7aee';
                done();
            }
        );
    });

    it('Gets and Updates via Cognito Sync', (done) => {
        app.handler(
            {
                resource: '/users/{identityId}',
                path: '/users/7a2fbb4d-479b-4be1-a756-d12da10c7aee',
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
                    identityId: '7a2fbb4d-479b-4be1-a756-d12da10c7aee'
                },
                stageVariables: null,
                requestContext: {
                    path: '/development/users/7a2fbb4d-479b-4be1-a756-d12da10c7aee',
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
                expect(data.identityId).to.be.eql(this.identityId);
                done();
            }
        );
    });
    after((done) => {
        app.handler(
            {
                resource: '/users/{identityId}',
                path: '/users/7a2fbb4d-479b-4be1-a756-d12da10c7aee',
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
                    identityId: '7a2fbb4d-479b-4be1-a756-d12da10c7aee'
                },
                stageVariables: null,
                requestContext: {
                    path: '/development/users/7a2fbb4d-479b-4be1-a756-d12da10c7aee',
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

describe('Handle user that already exists', function() {
    before((done) => {
        cognito_trigger.handler(
            {
                version: '1',
                region: 'us-east-1',
                userPoolId: 'us-east-1_UvVeNoe5z',
                userName: 'hatboyzero2',
                callerContext:
                    {
                        awsSdkVersion: 'aws-sdk-js-2.6.4',
                        clientId: '6hdrpk1j20qmjhfdiga31uia80',
                    },
                triggerSource: 'PostConfirmation_ConfirmSignUp',
                request:
                    {
                        userAttributes:
                            {
                                sub: '7a2fbb4d-479b-4be1-a756-d12da10c7aee',
                                'cognito:user_status': 'CONFIRMED',
                                email_verified: 'true',
                                given_name: 'Matthew',
                                family_name: 'Gray',
                                email: 'mgray@hatboysoftware.com',
                            },
                    },
                response:
                    {

                    },
            },
            {
                // Empty context object for testing purposes
            },
            (err, out) => {
                expect(err).to.not.exist;
                this.identityId = '7a2fbb4d-479b-4be1-a756-d12da10c7aee';
                done();
            }
        );
    });

    it('Attempts to confirm a user that already exists', (done) => {
        cognito_trigger.handler(
            {
                version: '1',
                region: 'us-east-1',
                userPoolId: 'us-east-1_UvVeNoe5z',
                userName: 'hatboyzero2',
                callerContext:
                    {
                        awsSdkVersion: 'aws-sdk-js-2.6.4',
                        clientId: '6hdrpk1j20qmjhfdiga31uia80',
                    },
                triggerSource: 'PostConfirmation_ConfirmSignUp',
                request:
                    {
                        userAttributes:
                            {
                                sub: '7a2fbb4d-479b-4be1-a756-d12da10c7aee',
                                'cognito:user_status': 'CONFIRMED',
                                email_verified: 'true',
                                given_name: 'Matthew',
                                family_name: 'Gray',
                                email: 'mgray@hatboysoftware.com',
                            },
                    },
                response:
                    {

                    },
            },
            {
                // Empty context object for testing purposes
            },
            (err, out) => {
                expect(err).to.not.exist;
                this.identityId = '7a2fbb4d-479b-4be1-a756-d12da10c7aee';
                done();
            }
        );
    });
    after((done) => {
        app.handler(
            {
                resource: '/users/{identityId}',
                path: '/users/7a2fbb4d-479b-4be1-a756-d12da10c7aee',
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
                    identityId: '7a2fbb4d-479b-4be1-a756-d12da10c7aee'
                },
                stageVariables: null,
                requestContext: {
                    path: '/development/users/7a2fbb4d-479b-4be1-a756-d12da10c7aee',
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
