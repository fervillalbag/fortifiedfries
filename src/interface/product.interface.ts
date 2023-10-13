export type ProductPromotionsProps = {
  _id: string;
  images: string[];
  title: string;
  currency: {
    value: string;
  };
  price: number;
};

export type ProductProps = {
  _id: string;
  images: string[];
  title: string;
  currency: {
    value: string;
  };
  price: number;
  createdAt: Date;
};
