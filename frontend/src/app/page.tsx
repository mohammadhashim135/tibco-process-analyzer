import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        TIBCO Process Analyzer
      </h1>

      <FileUpload />
    </main>
  );
}