import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import ProductsList from "../components/ProductList";
import MyProductsList from "../components/MyProductList";

export default function MyItems() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white dark:bg-black flex-1 relative">
      <View className="w-full px-5 pt-4 pb-2 flex-row justify-between items-center">
        <View className=" flex-col">
          <Text className="text-3xl font-semibold text-black dark:text-white text-start">
            My Items
          </Text>
        </View>

        <View className="">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <EvilIcons
              name="arrow-left"
              size={36}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <MyProductsList />
    </SafeAreaView>
  );
}
