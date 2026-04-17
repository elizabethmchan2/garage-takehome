import GenerateInvoiceForm from "@/app/_components/GenerateInvoiceForm";
import Image from "next/image";
import GarageLogo from "@/app/garage-logo.svg";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans">
      <nav className="w-full px-16 py-4 border-b border-neutral-200">
        <Image src={GarageLogo} alt="Garage logo" width={120} height={32} />
      </nav>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 sm:items-start gap-2">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-medium text-black">
            Generate Invoice From Listing
          </h1>
        </div>
        <GenerateInvoiceForm />
      </main>
    </div>
  );
}
