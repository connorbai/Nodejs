#!/bin/bash
set -x
pwd

rm nodejs.zip

# recursive quiet compress better
zip -rq9 nodejs ./

aws s3 cp nodejs.zip s3://lly-cn-ibu-cmds-qa-private/cmds/layer/nodejs.zip

layer=$(aws lambda publish-layer-version \
    --layer-name cmds-layer-ts \
    --description "My Nodejs layer" \
    --license-info "MIT" \
    --content S3Bucket=lly-cn-ibu-cmds-qa-private,S3Key=cmds/layer/nodejs.zip \
    --compatible-runtimes nodejs14.x nodejs16.x)

LayerVersionArn=$(echo $layer | jq '.LayerVersionArn')

aws lambda update-function-configuration --function-name cmds-qa-s3-syncFormalTable --handler "index.handler" --layers $LayerVersionArn

#end