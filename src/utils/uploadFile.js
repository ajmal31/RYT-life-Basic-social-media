import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {v4} from "uuid"
import constants from "./constants.js";


const s3 = new S3Client({
  credentials: {
    accessKeyId: constants.AWS_ACCESS_KEY_ID,
    secretAccessKey: constants.AWS_SECRET_KEY,
  },
  region: "eu-north-1",
});

export const uploadFile = async (file,folderName) => {
    const bucketName="ryt-life"
    const key = `${folderName}/${v4()}`;
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file?.buffer,
      ContentType: file.mimetype,
    });

    //Adding to S3 Bucket
    await s3.send(command);
    const url = `https://s3.eu-north-1.amazonaws.com/${bucketName}/${key}`;
    return url; // Return the response from S3
};


