import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "  /server/db";
import axios from "axios";

type ResponseData = {
  message: string;
  data: any;
};

type Body = {
  image: string;
  info: JSON;
  userId: string;
  title: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    try {
      const { info, userId, image,title } = req.body as Body;
      const uploadImage = await axios.post("http://localhost:3000/api/upload", {
        blob: image,
      });
      const imageUrl = uploadImage.data.data;

      const response = await prisma.invoice
        .create({
          data: {
            image: imageUrl,
            title: title,
            invoiceinfo: info,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        })
        .catch((error) => {
          throw error;
        });

      return res.status(200).json({ message: "success", data: response });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  } else {
    res.status(400).json({ message: "error", data: "Method not allowed" });
  }
}
