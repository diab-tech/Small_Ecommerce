export interface IProduct {
  id?: string;
  title: string;
  description: string;
  price: string;
  category: string;
  imgURL: string;
  colors: string[];
}
export interface IFormInput {
  id: string;
  name: "title" | "description" | "price" | "imgURL";
  label: string;
  type: string;
}
