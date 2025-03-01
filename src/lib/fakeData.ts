import { COLORS } from "../constants/colors";
import { IProduct } from "../interfaces";
import { faker } from "@faker-js/faker";

const PRODUCT_LENGTH = 15;

// مجموعة فئات ثابتة لتجنب التكرار المفرط
const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home",
  "Toys",
  "Beauty",
  "Books",
];

export const fakeProductList: IProduct[] = Array.from(
  { length: PRODUCT_LENGTH },
  () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()), // تحويل السعر إلى رقم عشري
    imgURL: "../../pexels-miguel-mallari-3716324-5549660.jpg",
    category: faker.commerce.department(),
    // category: faker.helpers.arrayElement(CATEGORIES), // اختيار فئة عشوائية من القائمة
    colors: COLORS,
  })
);

// __________Input Data)__________

interface IInput {
  id: string;
  name: string;
  label: string;
  type: string;
}
export const FormInputData: IInput[] = [
  {
    id: "title",
    name: "title",
    label: "product title",
    type: "text",
  },
  {
    id: "description",
    name: "description",
    label: "product description",
    type: "text",
  },
  {
    id: "image",
    name: "image",
    label: "product image",
    type: "text",
  },
  {
    id: "price",
    name: "price",
    label: "product price",
    type: "text",
  },
];
