
export type TOrdrededProduct={
  productId: string;
  quantity: number
}

export type TOrder = {
    name: string;
    email: string;
    address: string;
    contactNo: string;
    totalPrice: number;
    products: TOrdrededProduct[];
    clientSecret: string;
    paymentIntent:string;
    paymentMethod: string;
  };
  