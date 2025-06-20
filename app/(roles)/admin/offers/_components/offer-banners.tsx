

import React from "react";
import { dummyOffers } from "@/lib/static";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag } from "lucide-react";
import { format } from "date-fns";
import OfferCard from "./offer-card";



const OfferBanners = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyOffers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
};

export default OfferBanners;
