import { NextApiRequest, NextApiResponse } from "next";
import getCollection, { ALIASES_COLLECTION } from "@/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { alias } = req.query;

  try {
    const aliasesCollection = await getCollection(ALIASES_COLLECTION);

    // Look for the alias in the database
    const record = await aliasesCollection.findOne({ alias });
    if (record) {
      res.writeHead(302, { Location: record.url });
      res.end();
    } else {
      res.status(404).json({ error: "Alias not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
