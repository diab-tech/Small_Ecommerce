const productValidation = (formInputs: {
  title: string;
  description: string;
  imgURL: string;
  price: string;
  colors: string[];
  category: string;
}) => {
  const errors: {
    title: string;
    description: string;
    imgURL: string;
    price: string;
    colors: string;
    category: string;
  } = {
    title: "",
    description: "",
    imgURL: "",
    price: "",
    colors: "",
    category: "",
  };

  // فحص الـ title
  if (!formInputs.title.trim() || formInputs.title.length < 10 || formInputs.title.length > 80) {
    errors.title = "Title must be between 10 and 80 characters.";
  }

  // فحص الـ description
  if (
    !formInputs.description.trim() ||
    formInputs.description.length < 50 ||
    formInputs.description.length > 800
  ) {
    errors.description = "Description must be between 50 and 800 characters.";
  }

  // فحص الـ imageURL
  if (!formInputs.imgURL.trim()) {
    errors.imgURL = "Image URL is required.";
  } else if (!/^https?:\/\/\S+\.\S+$/.test(formInputs.imgURL)) {
    errors.imgURL = "Please enter a valid URL.";
  }

  // فحص الـ price
  if (!formInputs.price.trim()) {
    errors.price = "Price is required.";
  } else if (!/^\d+(\.\d{1,2})?$/.test(formInputs.price)) {
    errors.price = "Price must be a valid number with up to two decimal places.";
  } else {
    const priceNum = parseFloat(formInputs.price);
    if (priceNum <= 0) {
      errors.price = "Price must be greater than zero.";
    }
  }

  // // فحص الـ color
  // if (formInputs.colors.length === 0) {
  //   errors.colors = "Please Select Product Color!";
  // }

  // فحص الـ category
  if (!formInputs.category.trim()) errors.category = "Select product category!";

  return errors;
};

export default productValidation;
