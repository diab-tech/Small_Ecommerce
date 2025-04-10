import { Button } from "@headlessui/react";
import ProductCard from "./components/ProductCard";
import { fakeProductList, FormInputData } from "./lib/fakeData";
import MyModal from "./Ui/Modal";
import { FormEvent, useMemo, useState } from "react";
import Input from "./Ui/Input";
import { IProduct } from "./interfaces";
import productValidation from "./validation";
import ColorPickerComponent from "./components/ColorPickerComponent";
import ErrorMsg from "./components/ErrorMsg";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const App = () => {
  // _____ Modal______
  const defaultProductObj = {
    title: "",
    description: "",
    imgURL: "",
    price: "",
    category: "",
    colors: [],
  };

  // _________State________
  const [isOpen, setIsOpen] = useState(false);
  const [inputData, setInputData] = useState<IProduct>(defaultProductObj);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [productState, setProductState] = useState<IProduct[]>(fakeProductList);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imgURL: "",
    price: "",
    colors: "",
    category: "",
  });
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  //  ________Handler________
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleColorsChange = (colors: string[]) => {
    setInputData({ ...inputData, colors });
    setErrors({ ...errors, colors: "" });
  };
  function closeHandler(): void {
    setInputData(defaultProductObj);
    close();
  }

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, description, imgURL, price, colors, category } = inputData;

    const validationErrors = productValidation({
      title,
      description,
      imgURL,
      price,
      colors,
      category,
    });
    setErrors(validationErrors);

    console.log("Input Data:", inputData);
    console.log("Errors:", validationErrors);

    if (Object.values(validationErrors).some((error) => error !== "")) {
      return; // يوقف الـ submit لو فيه أخطاء
    }

    if (selectedProduct) {
      // تحديث المنتج الموجود
      setProductState((prev) =>
        prev.map((p) => (p.id === selectedProduct.id ? { ...inputData, id: p.id } : p)),
      );
      console.log("Updated product:", inputData);
    } else {
      // إضافة منتج جديد
      setProductState((prev) => [{ ...inputData, id: uuidv4() }, ...prev]);
      console.log("Added new product:", inputData);
    }

    setInputData(defaultProductObj);
    setSelectedProduct(null);
    close();
  }
  //  ________Render________
  // Products
  const productData = useMemo(
    () =>
      productState.map((product) => {
        const handleEdit = () => {
          console.log("Edit product:", product.title);
          open();
          setInputData(product);
          setSelectedProduct(product);
        };

        const handleDelete = () => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            customClass: {
              popup: "custom-swal-popup", // Add a custom class to control height
            },
            width: "300px",
            padding: "1rem",
            heightAuto: false, // Disable automatic height adjustment
          }).then((result) => {
            if (result.isConfirmed) {
              setProductState((prev) => prev.filter((p) => p.id !== product.id));
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
                customClass: {
                  popup: "custom-swal-popup", // Add a custom class to control height
                },
                width: "300px",
                padding: "1rem",
                heightAuto: false, // Disable automatic height adjustment
              });
            }
          });
        };
        return (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        );
      }),
    [productState], // أضف products هنا عشان يتغير لما تتغير القايمة
  );
  // Modal Input
  const modalInput = FormInputData.map((input) => {
    return (
      <div className="flex flex-col" key={input.id}>
        <Input
          id={input.id}
          name={input.name}
          value={inputData[input.name]}
          onChange={inputHandler}
          label={input.label}
          placeholder=" "
        />
        <ErrorMsg msg={errors[input.name]} />
      </div>
    );
  });

  // // Modal Colors
  // const renderCircleColor = COLORS_DATA.map((col) => <CircleColors color={col} key={col} />);

  return (
    // start with mobile first && don't type sm ==> grid-cols-1 [Don't] sm:grid-cols-1
    <main className="container py-12 p-2 md:p-12 lg:p-14 xl:p-16">
      <Button
        children={"Add Product"}
        className={"bg-indigo-500 text-white rounded-md p-2 ml-auto flex my-3"}
        onClick={() => {
          open();
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mx-auto">
        {productData}
        <MyModal open={open} close={close} isOpen={isOpen} title={"ADD PRODUCT"}>
          <form onSubmit={submitHandler} className="flex flex-wrap flex-col space-y-3">
            <div className="space-y-3 w-full">{modalInput}</div>
            <div className="category flex flex-col">
              <select
                name="category"
                id="category"
                value={inputData.category}
                onChange={inputHandler}
                className="border-1 border-indigo-300 rounded-md p-2 focus:outline-none focus:ring-2 ring-indigo-500 shadow-sm"
              >
                <option value="" disabled className="text-gray-400">
                  Select a category
                </option>
                <option value="clothes">Clothes</option>
                <option value="Sports">Sports</option>
                <option value="Grocery">Grocery</option>
                <option value="Shoes">Shoes</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Computers">Computers</option>
                <option value="Tools">Tools</option>
                <option value="Outdoors">Outdoors</option>
              </select>
              <ErrorMsg msg={errors.category} />
            </div>
            <div className="flex flex-col flex-1/2">
              <span
                className="mb-0.5 capitalize text-sm font-bold cursor-pointer"
                style={{ color: "#666" }}
              >
                Select Color :
              </span>
              <div className=" flex flex-wrap ">
                <ColorPickerComponent
                  onColorsChange={handleColorsChange}
                  initialColors={inputData.colors}
                />
              </div>
              <ErrorMsg msg={errors.colors} />
            </div>
            <div className="flex space-x-3">
              <Button
                type="submit"
                className="Submit p-2 rounded-md flex-1 bg-indigo-600 hover:bg-indigo-700 text-amber-50 cursor-pointer"
              >
                Submit
              </Button>
              <Button
                className="Close p-2 rounded-md flex-1 bg-gray-600 hover:bg-gray-700 text-amber-50 cursor-pointer"
                onClick={closeHandler}
              >
                Close
              </Button>
            </div>
          </form>
        </MyModal>
      </div>
    </main>
  );
};

export default App;
