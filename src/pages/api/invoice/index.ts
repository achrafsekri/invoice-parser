import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "  /server/db";

type ResponseData = {
  message: string;
  data: any;
};

type Body = {
  image: string;
  info: string;
  userId: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method == "POST") {
    const { image, info, userId } = req.body as Body;
    prisma.invoice
      .create({
        data: {
          image,
          invoiceinfo: info,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })
      .then((data) => {
        res.status(200).json({ message: "success", data });
      })
      .catch((error) => {
        res.status(400).json({ message: "error", data: error });
      });
  }
}
