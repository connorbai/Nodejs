#!/bin/bash
# set -x
pwd

echo remove nodejs.zip  nodejs/*;
rm -rf nodejs.zip ./nodejs/
mkdir -p ./nodejs/node_modules

echo copy file into nodejs;
cp -r ./node_modules ./nodejs/
# recursive quiet compress better

echo "zip files"
zip -rq9 nodejs ./nodejs

echo "upload nodejs.zip into S3"
aws s3 cp nodejs.zip s3://lly-cn-ibu-cmds-qa-private/cmds/layer/nodejs.zip

echo "aws add layer version"
layer=$(aws lambda publish-layer-version \
    --layer-name cmds-layer-ts \
    --description "My Nodejs layer" \
    --license-info "MIT" \
    --content S3Bucket=lly-cn-ibu-cmds-qa-private,S3Key=cmds/layer/nodejs.zip \
    --compatible-runtimes nodejs14.x nodejs16.x)

LayerVersionArn=`echo $layer | jq '.LayerVersionArn'`
LayerVersionArn=`echo $LayerVersionArn | tr -d '"'`

echo "aws update lambda layer version: $LayerVersionArn"
aws lambda update-function-configuration \
    --function-name cmds-qa-s3-syncFormalTable \
    --handler "index.handler" \
    --layers $LayerVersionArn

#end