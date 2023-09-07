import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "  /server/db";

type ResponseData = {
  message: string;
  data: any;
};

type Body = {
  userId: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method == "Get") {
    try {
      const { userId } = req.query as Body;
      prisma.invoice
        .findMany({
          where: {
            userId: userId,
          },
        })
        .then((data) => {
          res.status(200).json({ message: "success", data });
        })
        .catch((error) => {
          res.status(400).json({ message: "error", data: error });
        });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  }
}
