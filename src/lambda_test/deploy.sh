#!/bin/bash
set -x
pwd

cp ~/.aws/credentials-qa ~/.aws/credentials

rm myfn.zip

zip -r9 ./myfn index.js package.json

aws lambda update-function-code --function-name cmds-qa-s3-syncFormalTable --zip-file fileb://myfn.zip

# aws lambda update-function-configuration --function-name cmds-qa-s3-syncFormalTable --handler "index.handler" --layers arn:aws-cn:lambda:cn-northwest-1:968245374389:layer:cmds-layer-ts:9
# bash -x deploy_layer.sh

# end

