import { NextApiRequest, NextApiResponse } from "next";
import getCollection, { ALIASES_COLLECTION } from "@/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const aliasesCollection = await getCollection(ALIASES_COLLECTION);

      // Fetch all aliases from the collection
      const aliases = await aliasesCollection.find().toArray();

      res.status(200).json(aliases);
    } catch (error) {
      console.error("Error fetching aliases:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
