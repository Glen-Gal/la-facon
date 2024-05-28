import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from React Navigation
import { useRouter } from "expo-router";

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

type ProductCardProps = Pick<Product, "_id" | "image">;

export default function ProductCard({
  _id,
  image: { clothes, size, clothe_name, desc, price },
}: ProductCardProps) {
  const router = useRouter();

  const handleTryOut = () => {
    const route = {
      pathname: "productDetails",
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
      </View>
    </View>
  );
}
