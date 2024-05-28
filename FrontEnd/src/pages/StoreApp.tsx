import React, { useEffect, useState } from "react";
import axios from "axios";

interface Item {
  itemTrademark: string;
  itemName: string;
  barcode: string;
}

let items: Item[] = [];

export default function StoreApp() {
  const [searching, setSearching] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [barcode, setBarcode] = useState("");
  const [mapImage, setMapImage] = useState("");

  async function toggleActive(value: boolean) {
    setSearching(value);
  }

  const [products, setProducts] = useState<Item[]>([
    { itemTrademark: "Grandiosa", itemName: "Grandiosa", barcode: "501" }, //1
    { itemTrademark: "Grandiosa", itemName: "Grandiosa Pepperoni", barcode: "502" }, //2
    { itemTrademark: "Grandiosa", itemName: "Grandiosa Kjøttboller", barcode: "503" }, //3
  ]);

  useEffect(() => {
    if (!barcode) {
      return;
    }
    console.log("Barcode has changed");
    getItemImage(barcode);
  }, [barcode]);

  //Fetch Items
  useEffect(() => {
    if (items.length > 0) {
      return;
    }
    axios
      .get("http://localhost:3000/v1/vare/alle")
      .then((response: any) => {
        items = response.data;
        setProducts(items.slice(0, 10));
      })
      .catch(() => {
        setProducts([
          { itemTrademark: "Grandiosa", itemName: "Grandiosa", barcode: "501" }, //1
          { itemTrademark: "Grandiosa", itemName: "Grandiosa Pepperoni", barcode: "502" }, //2
          { itemTrademark: "Grandiosa", itemName: "Grandiosa Kjøttboller", barcode: "503" }, //3
        ]);
      });
  }, []);

  async function getItemImage(barcode: string) {
    axios
      .get(`http://localhost:3000/v1/vare/bilde/${barcode}`, {
        responseType: "text",
      })
      .then((response) => {
        const url = `data:image/jpeg;base64,${response.data}`;
        setMapImage(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function searchItems(event: React.KeyboardEvent) {
    if (event.key != "Enter") {
      return;
    }

    axios
      .get(`http://localhost:3000/v1/vare/search/${textInput}`, {
        responseType: "text",
      })
      .then((response) => {
        console.log(JSON.parse(response.data));
        // setProducts(JSON.parse(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleTextInput(input: string) {
    setTextInput(input);

    const productsList = items.filter(
      (item) =>
        item.itemName.toLowerCase().startsWith(input.toLowerCase()) ||
        item.itemTrademark.toLowerCase().startsWith(input.toLowerCase())
    );

    // if (!productsList) {
    //   setProducts();
    // }

    setProducts(productsList.slice(0, 10));
  }

  return (
    <>
      <div className="absolute hidden sm-h:sm:flex">
        <div>
          <p className="text-2xl">This webpage can only be run on phone sizes!</p>
          <p className="text-2xl">Go on Inspect Element (Right Click {"->"} Inspect Element)</p>
          <img src="/wrong_format.png" alt="How to access Phone Menu" className="h-1/2" />
          <p className="text-2xl"></p>
        </div>
      </div>
      {/* Rotate for full map */}
      <div className="sm-h:hidden lg:hidden flex">
        <img className=" h-full w-full " src={mapImage || "/Example_Store.png"}></img>
      </div>
      {/* End of Rotate for full map */}
      {/* Shop App Below*/}
      <div className={`absolute bg-gray-200 h-screen w-screen sm:hidden flex z-10`}>
        <div className="top-0 h-1/6 w-screen bg-blue-700 absolute flex items-center justify-center">
          <p className="text-2xl text-white font-bold">Varesøk</p>
          <div className="h-11 w-24 bg-white absolute right-10 rounded-2xl items-center flex flex-col">
            <p className="font-bold text-blue-700 text-sm text-left">Reknes</p>
            <p className="text-xs text-blue-700">07:00 - 23:00</p>
          </div>
        </div>
        {/* Map Area */}

        <div className="">
          <div className="h-1/4 w-5/6 absolute items-center justify-center flex left-0 right-0 top-[30%] m-auto bg-white border-2 rounded-md border-gray-500 overflow-scroll">
            <img className=" h-full w-full " src={mapImage || "/Example_Store.png"}></img>
          </div>
          <input
            type="text"
            id="SearchBar"
            className={`z-20 text-center h-20 w-60  absolute left-0 right-0 m-auto rounded-2xl bg-white border-2 justify-center transition-all duration-500 ease-in-out transform ${
              searching ? "top-[19%]" : "top-[65%]"
            }`}
            onFocus={() => {
              toggleActive(true);
              setTimeout(() => {
                window.scrollTo(0, 0);
              }, 600);
            }}
            placeholder="Søk vare"
            onChange={(event) => {
              handleTextInput(event.target.value);
            }}
            onKeyDown={(event) => {
              searchItems(event);
            }}
          >
            {/* <p className="text-blue-700 text-xl">Velg Vare</p> */}
          </input>
        </div>
        {/* End of Map Area */}

        <div className="bottom-0 h-1/6 bg-white absolute">
          <img className="w-screen object-cover" src="/Toolbar.png"></img>
        </div>
        <div
          className={`z-10 w-screen bottom-0 absolute bg-white transition-all duration-500 ease-in-out transform ${
            searching ? "h-[70%] mt-20" : "h-0"
          }`}
        >
          {searching && (
            <div>
              <h2 className=" text-2xl text-center top-1/2 items-center">Varesøk</h2>
              <button
                name="disableButton"
                onClick={() => {
                  toggleActive(false);
                }}
                className="border-2 border-black p-2 absolute right-10 top-4 rounded-lg"
              >
                <img className="size-4" src="/x-symbol.svg"></img>
              </button>
              <div
                id="ItemContainer"
                className="absolute w-screen items-center flex pt-1 flex-col space-y-2 top-[15%] bottom-0 border-2 border-gray-400 overflow-y-scroll pb-1"
              >
                {products.length == 0 && (
                  <div className="items-center text-center text-xl">
                    <p>No Items corresponding</p>
                    <p>to your search of </p>
                    <p className="underline">{textInput}</p>
                  </div>
                )}
                {products.length > 0 &&
                  products.map((product, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-200 w-5/6 h-50 justify-end flex text-center items-center relative"
                      onClick={() => {
                        setBarcode(product.barcode);
                        setSearching(false);
                      }}
                    >
                      <div className="w-10 h-10 border-2  rounded-full absolute left-1"></div>
                      <div id="textContainer" className="w-5/6 text-left overflow-hidden">
                        <p className=" text-xs text-blue-700">{product.itemTrademark}</p>
                        <p className=" text-blue-700">{product.itemName}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
