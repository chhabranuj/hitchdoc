import aws from "aws-sdk";

const region = "ap-south-1";
const bucketName = "hitchdoc-bucket";
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4"
});

const generateUrl = async (documentName, user, type) => {
    const params = ({
        Bucket: bucketName,
        Key: `${user}/${documentName}`,
        ContentType: type,
        Expires: 120
    })

    const url = await s3.getSignedUrlPromise("putObject", params);
    return url;
}

export default generateUrl;