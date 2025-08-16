import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

// Initialize S3 client for R2
const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

const bucketName = process.env.R2_BUCKET_NAME;
const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

export const uploadToR2 = async (file, folder = 'articles') => {
    try {
        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

        // Upload to R2
        const uploadParams = {
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read', // Make the file publicly accessible
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        // Return the public URL
        return `${publicBaseUrl}/${fileName}`;
    } catch (error) {
        console.error('Error uploading to R2:', error);
        throw new Error('Failed to upload file to R2');
    }
};

export const deleteFromR2 = async (fileUrl) => {
    try {
        // Extract the key from the URL
        const urlParts = fileUrl.replace(publicBaseUrl + '/', '');

        const deleteParams = {
            Bucket: bucketName,
            Key: urlParts,
        };

        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log('File deleted from R2:', urlParts);
    } catch (error) {
        console.error('Error deleting from R2:', error);
        // Don't throw error for delete failures as it's not critical
    }
};

export default {
    uploadToR2,
    deleteFromR2,
};
