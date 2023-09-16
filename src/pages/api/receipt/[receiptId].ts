import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "  /server/db";

type ResponseData = {
  message: string;
  data: any;
};

type Query = {
  receiptId: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const { receiptId } = req.query as Query;
      const receipt = prisma.receipt.findUnique({
        where: {
          id: receiptId,
        },
      });
      res.status(200).json({ message: "success", data: receipt });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  }
  if (req.method === "PUT") {
    try {
      const { receiptId } = req.query as Query;
      const receipt = prisma.receipt.findUnique({
        where: {
          id: receiptId,
        },
      });
      res.status(200).json({ message: "success", data: receipt });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  }
  if (req.method === "DELETE") {
    try {
      const { receiptId } = req.query as Query;
      const receipt = prisma.receipt.findUnique({
        where: {
          id: receiptId,
        },
      });
      res.status(200).json({ message: "success", data: receipt });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  }
}
