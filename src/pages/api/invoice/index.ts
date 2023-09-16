import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "  /server/db";

type ResponseData = {
  message: string;
  data: any;
};

type Body = {
  image: string;
  info: JSON;
  userId: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method == "POST") {
    const { info, userId } = req.body as Body;
    const image = "hello";
    prisma.invoice
      .create({
        data: {
          image,
          invoiceinfo: JSON.stringify(info),
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
