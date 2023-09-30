import { BlobServiceClient } from "@azure/storage-blob";
import { NextApiRequest, NextApiResponse } from "next";

function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, "base64");
}

type Query = {
  blob: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { blob } = req.body as Query;

  // Get your connection string from env variables or other secure sources

  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_STORAGE_CONNECTION_STRING;

  // Create the BlobServiceClient object which will be used to create a container client

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );

  // Get a reference to a container

  const containerName = "snakecontainer";

  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Create a blob (file) name

  const blobName = `blob${Date.now()}.jpg`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload data to the blob

  const data = base64ToBuffer(blob); // Assuming you're sending the data as a buffer or string
  console.log(data);

  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);

  const blobUrl = `https://snake2023.blob.core.windows.net/snakecontainer/${blobName}`;

  res.status(200).send({
    message: `Upload block blob ${blobName} successfully`,
    data: blobUrl,
  });
}
