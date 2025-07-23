export type Store = {
  id: number;
  aquariumName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  businessName: string;
  businessRegNumber: string;
  address: string;
  province: string;
  postalCode: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};
