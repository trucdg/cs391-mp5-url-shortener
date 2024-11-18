import getCollection, {ALIASES_COLLECTION} from "@/db";
import { AliasProps } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      const { alias, url }: AliasProps = req.body;
  
      // Validate the URL
      try {
        new URL(url);
      } catch (err) {
        return res.status(400).json({ error: "Invalid URL" });
      }
  
      try {
        const aliasesCollection = await getCollection(ALIASES_COLLECTION);
  
        // Check if alias already exists
        const existing = await aliasesCollection.findOne({ alias });
        if (existing) {
          return res.status(400).json({ error: "Alias already taken" });
        }
  
        // Insert new alias
        await aliasesCollection.insertOne({ alias, url });
        res.status(200).json({ alias, url });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }