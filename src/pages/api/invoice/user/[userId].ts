import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "  /server/db";

type ResponseData = {
  message: string;
  data: any;
};

type Body = {
  userId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query as Body;
      const response = await prisma.invoice.findMany({
        where: {
          userId: userId,
        },
      });

      res.status(200).json({ message: "success", data: response });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  }
}
