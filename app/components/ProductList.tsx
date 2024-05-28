import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  image: {
    clothes: string;
    size: string;
    clothe_name: string;
    desc: string;
    price: number;
  };
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fashion-app-5msi.onrender.com/admin/getallUpload")
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(product: Product) => product._id}
      renderItem={({ item }) => <ProductCard {...item} />}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
    />
  );
}
