#!/bin/bash
set -x
pwd

cp ~/.aws/credentials-qa ~/.aws/credentials

rm myfn.zip && zip -r -9 ./myfn ./

aws lambda update-function-code --function-name cmds-qa-s3-syncFormalTable --zip-file fileb://myfn.zip

# aws lambda update-function-configuration --function-name cmds-qa-s3-syncFormalTable --handler "index.handler" --layers arn:aws-cn:lambda:cn-northwest-1:968245374389:layer:cmds-layer-ts:5

cd ../lambda_test

sh deploy.sh

# end