import AWS from 'aws-sdk'
import 'dotenv/config'


export async function main() {
    const s3 = new AWS.S3({
        accessKeyId: `${process.env.AWS_ACCESS_KEY_ID_RE}`,
        secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY_RE}`,
        s3ForcePathStyle: false, // needed with minio?
        signatureVersion: 'v4',
    });
    var params = {
        Bucket: "lly-cn-ibu-cmds-qa-private",
        Key: "cmds/index-management/AQ-2022110818181513.csv"
    };
    const buf = await s3.getObject(params).promise()
    console.log(buf)
    const data = new Uint8Array(buf.Body as any)
    var dataString = "";
    for (var i = 0; i < data.length; i++) {
        dataString += String.fromCharCode(data[i]);
    }
    console.log(dataString)
}


main()
.catch(err => {
    console.log(err);
})