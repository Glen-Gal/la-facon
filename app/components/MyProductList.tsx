import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import AdminProductCard from "./AdminProductCard";

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

export default function MyProductsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [refresh, setRefresh] = useState(false); // State for refreshing

  useEffect(() => {
    fetch("https://fashion-app-5msi.onrender.com/admin/getallUpload")
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [refresh]); // Refresh when the refresh state changes

  return (
    <FlatList
      data={products}
      keyExtractor={(product: Product) => product._id}
      renderItem={({ item }) => (
        <AdminProductCard {...item} refresh={refresh} setRefresh={setRefresh} />
      )}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
    />
  );
}
