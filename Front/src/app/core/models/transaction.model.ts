export interface Transaction {
  id: number;
  userId: number;
  price: number;
  location: string;
  date: Date;
  allocationId?: number;
}
