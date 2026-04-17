"use client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getUUIDFromListing } from "@/app/_utils/getUUIDFromListing";
import { Listing } from "@/app/_types/listing";
import InvoiceOptions from "@/app/_components/InvoiceOptions";
import PrimaryButton from "@/app/_components/ui/PrimaryButton";
import TextInput from "@/app/_components/ui/TextInput";

type FormValues = {
  listing: string;
};

const GenerateInvoiceForm = () => {
  const methods = useForm<FormValues>();
  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = methods;

  const [listingData, setListingData] = useState<Listing | null>();

  const onSubmit = async (formValues: FormValues) => {
    const UUID = getUUIDFromListing(formValues.listing);

    if (!UUID) {
      setError("listing", {
        type: "manual",
        message: "No valid listing UUID found in URL",
      });
      return;
    }

    try {
      const res = await fetch(`/api/listing?listing_id=${UUID}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setListingData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("listing", {
          type: "manual",
          message: err.message,
        });
      }
    }
  };

  if (listingData) {
    return (
      <InvoiceOptions
        listingData={listingData}
        onGoBack={() => setListingData(null)}
      />
    );
  }

  return (
    <div>
      <p className="text-black">
        Paste a link to the listing and we will generate an invoice that you can
        download or email.
      </p>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="my-6">
          <TextInput<FormValues>
            name="listing"
            label="Link to listing"
            placeholder="https://www.shopgarage.com/listing/2025-Toyne-Freightliner-4x4-Pumper-11653dfc-46ea-4c03-9f10-f9f6065909b1"
            rules={{
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                message: "Must input URL",
              },
              required: "Field required",
            }}
          />
          <PrimaryButton type="submit" disabled={isSubmitting} className="mt-4">
            {isSubmitting ? "Loading..." : "Generate PDF"}
          </PrimaryButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default GenerateInvoiceForm;
