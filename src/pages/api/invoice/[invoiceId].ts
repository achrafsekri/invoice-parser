import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "  /server/db";

type ResponseData = {
  message: string;
  data: any;
};

type Query = {
  invoiceId: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const { invoiceId } = req.query as Query;
      const invoice = prisma.invoice.findUnique({
        where: {
          id: invoiceId,
        },
      });
      res.status(200).json({ message: "success", data: invoice });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  }
  if (req.method === "PUT") {
    try {
      const { invoiceId } = req.query as Query;
      const invoice = prisma.invoice.findUnique({
        where: {
          id: invoiceId,
        },
      });
      res.status(200).json({ message: "success", data: invoice });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  }
  if (req.method === "DELETE") {
    try {
      const { invoiceId } = req.query as Query;
      const invoice = prisma.invoice.findUnique({
        where: {
          id: invoiceId,
        },
      });
      res.status(200).json({ message: "success", data: invoice });
    } catch (error) {
      res.status(400).json({ message: "error", data: error });
    }
  }
}
