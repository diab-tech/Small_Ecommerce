import Image from "./Image";
import { IProduct } from "../interfaces";
import { txtSlicers } from "../utils/functions";

interface IProps {
  product: IProduct;
  onEdit: () => void;
  onDelete: () => void;
}
const ProductCard = ({ product, onEdit, onDelete }: IProps) => {
  // destructuring
  const { title, description, imgURL, price, category, colors } = product;

  // _________RENDER__________
  const renderColor =
    colors.length !== 0 ? (
      colors.map((color) => (
        <span
          className=" w-5 h-5 rounded-full "
          style={{ backgroundColor: color }}
          key={color}
        ></span>
      ))
    ) : (
      <span>No Available Colors!</span>
    );

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
        <div className="colors flex space-x-2 my-3">{renderColor}</div>
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold">${Number(price).toLocaleString()}</span>
          <span className="font-bold">{category}</span>
        </div>
        <div className="btn flex space-x-2">
          <button
            className="edit p-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-amber-50 flex-[2] cursor-pointer"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="delete p-2 rounded-md flex-1 bg-red-700 hover:bg-red-800 text-amber-50 cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
