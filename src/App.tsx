import { Button } from "@headlessui/react";
import ProductCard from "./components/ProductCard";
import { fakeProductList, FormInputData } from "./lib/fakeData";
import MyModal from "./Ui/Modal";
import { useState } from "react";
import Input from "./Ui/Input";

const App = () => {
  // _____ Modal______
  const [isOpen, setIsOpen] = useState(false);

  // _________Handler________
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  //  ________Render________
  // Products
  const productData = fakeProductList.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  // Modal Input
  const modalInput = FormInputData.map((input) => {
    return (
      <div className="flex flex-col ">
        <label htmlFor={input.id}>{input.label}</label>
        <Input id={input.id} className="border border-amber-700" />
      </div>
    );
  });

  return (
    // start with mobile first && don't type sm ==> grid-cols-1 [Don't] sm:grid-cols-1
    <main className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 p-2 md:p-12 lg:p-14 xl:p-16 mx-auto ">
      <Button
        children={"Add Product"}
        className={"bg-blue-800 text-white rounded-md"}
        onClick={() => {
          open();
        }}
      />
      {productData}
      <MyModal isOpen={isOpen} close={close} title={"Add"}>
        {modalInput}
        <div className="flex items-center space-x-1.5 ">
          <Button className="Submit p-2 rounded-md flex-1 bg-blue-700 text-amber-50">
            Submit
          </Button>
          <Button
            className="Close p-2 rounded-md flex-1 bg-red-700 text-amber-50"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </div>
      </MyModal>
    </main>
  );
};

export default App;
