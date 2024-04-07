import { useState } from "react";
import Header from "./components/Header/Header";
import ProductCard from "./components/ProductCard/ProductCard";
import { productList } from "./data/index";
import Modal from "./components/Modal/Modal";
import { IErrors, IProducts } from "./Interfaces/products";
import {
  descriptionValidation,
  imageURLValidation,
  priceValidation,
  titleValidation,
} from "./functions";

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productsList, setProductsList] = useState<IProducts[]>(productList);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [update, setUpdate] = useState<boolean>(false);
  const [error, setError] = useState<IErrors>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  function closeModal() {
    setIsOpen(false);
    setUpdate(false);
  }

  function openModal() {
    setIsOpen(true);
    setUpdate(false);
  }

  function updateProduct() {
    setIsOpen(true);
    setUpdate(true)
  }

  function errorHandling(inputName: string, errorMsg: string) {
    setError((prev: IErrors) => {
      return {
        ...prev,
        [inputName]: errorMsg,
      };
    });
    setDisabled(true);
  }
  function escapeTheError(inputName: string) {
    setError((prev: IErrors) => {
      return {
        ...prev,
        [inputName]: "",
      };
    });
    setDisabled(false);
  }

  function errorValidation(value: string, inputName: string) {
    switch (inputName) {
      case "title":
        if (!titleValidation(value)) {
          errorHandling(inputName, "Fisrt letter must be character only and the num of characters must be from 4 to 10")
        } else {
          escapeTheError(inputName)
        }
        break;

      case "description":
        if (!descriptionValidation(value)) {
          errorHandling(inputName, "First letter must be character only and the num of characters must be from 4 to 200")
        } else {
          escapeTheError(inputName)
        }
        break;

      case "imageURL":
        if (!imageURLValidation(value)) {
          errorHandling(inputName, "Enter a valid image url")
        } else {
          escapeTheError(inputName)
        }
        break;

      case "price":
        if (!priceValidation(value)) {
          errorHandling(inputName, "Price is required and must be numbers only")
        } else {
          escapeTheError(inputName)
          break;
        }
    }
  }

  // function submitValidation(inputValues: IProducts) {
  //   if (!titleValidation(inputValues.title)) {
  //     errorHandling("title", "Fisrt letter must be character only and the num of characters must be from 4 to 10")
  //   } else {
  //     escapeTheError("title")
  //   }

  //   if (!descriptionValidation(inputValues.description)) {
  //     errorHandling("description", "Fisrt letter must be character only and the num of characters must be from 4 to 200")
  //   } else {
  //     escapeTheError("description")
  //   }

  //   if (!imageURLValidation(inputValues.imageURL)) {
  //     errorHandling("imageURL", "Enter a valid image url")
  //   } else {
  //     escapeTheError("imageURL")
  //   }

  //   if (!priceValidation(inputValues.price)) {
  //     errorHandling("price", "Price is required and must be numbers only")
  //   } else {
  //     escapeTheError("price")
  //   }
  // }
  return (
    <>
      <div className="container mx-auto pt-10">
        <Header openModal={openModal} />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-3 gap-y-12">
          {productsList?.map((prod) => (
            <ProductCard key={prod.id} {...prod} update={update}/>
          ))}
        </div>
        <Modal
          setProductsList={setProductsList}
          isOpen={isOpen}
          closeModal={closeModal}
          errorValidation={errorValidation}
          error={error}
          // submitValidation={submitValidation}
          disabled={disabled}
          updateProduct={updateProduct}
        />
      </div>
    </>
  );
}

export default App;
