import { Storage } from "@google-cloud/storage";

const storage = new Storage({
    projectId: process.env.PROJECT_BUCKET_ID,
    keyFilename: process.env.BUCKET_SERVICE_ID,
})

const bucketName = process.env.BUCKET_NAME
export const bucket = storage.bucket(bucketName);