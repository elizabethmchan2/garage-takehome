type ListingImage = {
  id: string;
  order: number;
  url: string;
};

type ListingAttribute = {
  id: string;
  createdAt: string;
  updatedAt: string;
  listingId: string;
  categoryAttributeId: string;
  value: string;
};

type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  imageUrl: string;
  slug: string;
  parentCategoryId: string;
};

export type Listing = {
  id: string;
  secondaryId: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  tags: string[];
  deliveryMethod: string;
  listingTitle: string;
  sellingPrice: number;
  estimatedPriceMin: number | null;
  estimatedPriceMax: number | null;
  appraisedPrice: number | null;
  categories: string[];
  itemBrand: string;
  listingDescription: string;
  itemAge: number;
  itemLength: number | null;
  itemWidth: number | null;
  itemHeight: number | null;
  itemWeight: number | null;
  isAuction: boolean;
  expirationDate: string | null;
  auctionStartingPrice: number | null;
  vin: string | null;
  categoryId: string;
  isPickupAvailable: boolean;
  userId: string;
  addressId: string;
  ListingAttribute: ListingAttribute[];
  address: {
    state: string;
  };
  category: Category;
  listingImages: ListingImage[];
};
