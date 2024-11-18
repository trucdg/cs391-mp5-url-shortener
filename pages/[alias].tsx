import { GetServerSideProps } from "next";
import getCollection, { ALIASES_COLLECTION } from "@/db";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { alias } = context.params as { alias: string };

  try {
    const aliasesCollection = await getCollection(ALIASES_COLLECTION);

    // Find the alias in the database
    const record = await aliasesCollection.findOne({ alias });

    if (record) {
      // Redirect to the original URL
      return {
        redirect: {
          destination: record.url,
          permanent: false,
        },
      };
    } else {
      // Alias not found, render a 404 page
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error fetching alias:", error);
    return {
      notFound: true,
    };
  }
};

export default function AliasPage() {
  return null; // This component will never render because of redirects or 404s
}
