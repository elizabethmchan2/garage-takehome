"use client";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "@/app/_components/InvoicePDF";
import { Listing } from "@/app/_types/listing";
import PrimaryButton from "@/app/_components/common/PrimaryButton";
import TextInput from "@/app/_components/common/TextInput";
import { useForm, FormProvider } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";

type EmailForm = {
  email: string | null;
};

const InvoiceOptions = ({
  data,
  onGoBack,
}: {
  data: Listing;
  onGoBack: () => void;
}) => {
  const [hasEmailSent, setHasEmailSent] = useState<boolean>();

  const methods = useForm<EmailForm>();
  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = methods;

  const onSubmit = async (formValues: EmailForm) => {
    try {
      const blob = await pdf(<InvoicePDF data={data} />).toBlob();

      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(",")[1];
          resolve(base64);
        };
        reader.readAsDataURL(blob);
      });

      await fetch("/api/send-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formValues.email,
          pdf: base64,
          title: `Invoice for ${data.listingTitle}`,
        }),
      });

      setHasEmailSent(true);
    } catch {
      setError("email", {
        type: "manual",
        message: "Error sending email. Please try again",
      });
    }
  };

  if (!data) return null;

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={onGoBack}
        className="touch-manipulation text-black cursor-pointer h-10 font-medium mb-2"
      >
        {" "}
        {`<-`} Go back
      </button>
      <p>You requested an invoice for the {data.listingTitle}</p>
      <div className="flex flex-col gap-2 mt-2">
        <PDFDownloadLink
          document={<InvoicePDF data={data} />}
          fileName={`${data.listingTitle}-invoice.pdf`}
        >
          {({ loading }) => (
            <PrimaryButton type="button" disabled={loading}>
              {loading ? "Preparing..." : "Download invoice"}
            </PrimaryButton>
          )}
        </PDFDownloadLink>
        <div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput<EmailForm>
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                rules={{
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Must input email address",
                  },
                  required: "Field required",
                }}
              />
              <PrimaryButton
                type="submit"
                disabled={isSubmitting}
                className="mt-4"
              >
                {isSubmitting ? "Sending..." : "Email PDF"}
              </PrimaryButton>
              {hasEmailSent && !isSubmitting && "Email sent!"}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default InvoiceOptions;
