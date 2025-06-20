import React from "react";
import CreateOfferBannerButton from "./_components/create-offer-banner-button";
import OfferBanners from "./_components/offer-banners";


const OffersPage = () => {
  return (
    <main className="p-3 w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold">Manage Offer Banners</h1>
        <CreateOfferBannerButton/>
      </div>
      <div className="mt-10">
        <OfferBanners/>
      </div>
    </main>
  );
};

export default OffersPage;
