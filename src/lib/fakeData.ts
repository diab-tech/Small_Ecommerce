import { COLORS } from "../constants/colors";
import { IFormInput, IProduct } from "../interfaces";
import { faker } from "@faker-js/faker";

const PRODUCT_LENGTH = 20;

export const fakeProductList: IProduct[] = Array.from({ length: PRODUCT_LENGTH }, () => ({
  id: crypto.randomUUID(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(), // تحويل السعر إلى رقم عشري
  imgURL: "pexels-miguel-mallari-3716324-5549660.jpg",
  category: faker.commerce.department(),
  colors: COLORS,
}));

// __________Input Data)__________

export const FormInputData: IFormInput[] = [
  {
    id: "title",
    name: "title",
    label: " title",
    type: "text",
  },
  {
    id: "description",
    name: "description",
    label: " description",
    type: "text",
  },
  {
    id: "image",
    name: "imgURL",
    label: " image",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    label: " price",
    type: "text",
  },
];
