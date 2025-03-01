import Button from "../Ui/Button";
import Image from "./Image";
import { IProduct } from "../interfaces";
import { txtSlicers } from "../utils/functions";

interface IProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProps) => {
  // destructuring
  const { title, description, imgURL, price, colors, category } = product;
  return (
    <div className="border rounded-md max-w-sm md:max-w-lg mx-auto ">
      <div className="card p-2 ">
        <div className="">
          <Image className="rounded-md mb-2" url={imgURL} alt={title} />
        </div>
        <h3 className="title text-gray-800 font-bold capitalize w-full h-full object-cover text-[18px] ">
          {txtSlicers(title)}
        </h3>
        <p className="description text-sm text-gray-500 font-medium">
          {txtSlicers(description, 55)}
        </p>
        <div className="colors flex space-x-2 my-3">
          <span className="bg-amber-500 w-5 h-5 rounded-full "></span>
          <span className="bg-red-500 w-5 h-5 rounded-full "></span>
          <span className="bg-lime-950 w-5 h-5 rounded-full "></span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold">{price}</span>
          <Image
            className="rounded-full w-11 h-11 "
            url={category}
            alt={title}
          />
        </div>
        <div className="btn flex space-x-2">
          <button className="edit p-2 rounded-md bg-lime-700 text-amber-50 flex-[2] ">
            Edit
          </button>
          <button className="delete p-2 rounded-md flex-1 bg-red-700 text-amber-50">
            Delete
          </button>
          <Button
            className="cancel p-2 rounded-md flex-1 bg-gray-700 text-amber-50"
            children={"Cancel"}
            onClick={() => {
              console.log("clicked");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
