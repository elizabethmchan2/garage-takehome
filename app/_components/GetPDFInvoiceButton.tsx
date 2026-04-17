"use client";
import { useState } from "react";
import GenerateInvoiceForm from "@/app/_components/GenerateInvoiceForm";
import Image from "next/image";
import PDF from "@/app/_components/svgs/pdf.svg";
import RightArrow from "@/app/_components/svgs/right-arrow.svg";

export const GetPDFInvoiceButton = () => {
  const [isFormShown, setIsFormShown] = useState<boolean>();

  if (isFormShown) {
    return <GenerateInvoiceForm onGoBack={() => setIsFormShown(false)} />;
  }

  return (
    <button
      type="button"
      onClick={() => setIsFormShown(true)}
      className="cursor-pointer flex w-full items-center justify-between space-x-4 p-4 sm:p-6 outline outline-1 outline-neutral-950/10 rounded-lg bg-white hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-center space-x-4">
        <div>
          <Image src={PDF} alt="PDF icon" width={40} height={40} />
        </div>
        <div className="flex items-start flex-col">
          <p className="text-left sm:text-lg tracking-wide"></p>PDF Invoice
          <p className="text-left text-xs sm:text-sm font-light tracking-wide text-neutral-500">
            Download or email invoice.
          </p>
        </div>
      </div>
      <Image src={RightArrow} alt="Right arrow icon" width={24} height={24} />
    </button>
  );
};
