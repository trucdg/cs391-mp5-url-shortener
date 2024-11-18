import ShortenerForm from "@/components/ShortenerForm";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <ShortenerForm />
    </div>
  );
}
