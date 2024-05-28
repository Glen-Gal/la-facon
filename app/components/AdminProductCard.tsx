import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

interface AdminProductCardProps {
  _id: string;
  image: {
    clothes: string;
    size: string;
    clothe_name: string;
    desc: string;
    price: number;
  };
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminProductCard({
  _id,
  image: { clothes, size, clothe_name, desc, price },
  refresh,
  setRefresh,
}: AdminProductCardProps) {
  const router = useRouter();

  const handleTryOut = () => {
    const route = {
      pathname: "myItems",
      params: {
        id: _id,
        image: clothes,
        category: size,
        title: clothe_name,
        price,
        description: desc,
      },
    };
    router.push(route);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://fashion-app-5msi.onrender.com/admin/deleteUpload/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Product deleted successfully");
        // Toggle refresh state in the parent to trigger re-render
        setRefresh(!refresh);
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to delete product");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
      console.log(error);
    }
  };

  return (
    <View className="w-full bg-gray-100 dark:bg-gray-50/10 rounded-3xl p-5 my-5">
      <View className="bg-white rounded-xl">
        <Image
          source={{ uri: clothes }}
          className="w-full h-72"
          style={{ resizeMode: "contain" }}
        />
      </View>
      <View className="mt-5">
        <Text className="text-sm text-black/60 dark:text-white/70">{size}</Text>
        <Text className="text-lg font-semibold dark:text-white">
          {clothe_name}
        </Text>
        <Text
          numberOfLines={2}
          className="text-sm text-black/60 dark:text-white/70"
        >
          {desc}
        </Text>
        <View className="flex-row justify-between items-center my-3">
          <Text className=" dark:text-white"></Text>
          <Text className="text-2xl font-extrabold dark:text-white self-end">
            ${price}
          </Text>
        </View>
        <View className="flex-row justify-end items-center my-1 mb-3">
          <TouchableOpacity
            className="flex-row justify-center rounded-full border border-black/90 dark:border-white/90 p-3 w-full self-center"
            onPress={handleTryOut}
          >
            <Text className="text-black dark:text-white font-bold">
              Try Out
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-end items-center my-1 mb-3">
          <TouchableOpacity
            className="flex-row justify-center rounded-full border border-red-600 p-3 w-full self-center"
            onPress={handleDelete}
          >
            <Text className="text-red-600 font-bold">Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
