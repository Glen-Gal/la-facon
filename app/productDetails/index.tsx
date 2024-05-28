import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "nativewind";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function productDetails() {
  const { colorScheme } = useColorScheme();
  const params = useLocalSearchParams();
  // Ensure price is always initialized
  const { id, image, category, title, price = 0, description } = params;

  // Cast price to a number
  const numericPrice = parseFloat(price as string);

  const [count, setCount] = React.useState(1);

  const router = useRouter();

  const handleTryOut = () => {
    router.push({
      pathname: "/tryOut",
      params: { image: image as string },
    });
  };

  return (
    <SafeAreaView className="bg-white dark:bg-black flex-1 relative">
      <ScrollView className="flex-1">
        <View className="bg-gray-100">
          <Image
            source={{ uri: image as string }} // Ensure the type is string
            className="w-full h-72"
            style={{ resizeMode: "contain" }}
          />
        </View>
        <View className="px-5">
          <Text className="text-md text-black/60 dark:text-white/70 mt-4">
            {category as string}
          </Text>
          <Text className="text-2xl font-semibold dark:text-white w-64">
            {title as string}
          </Text>
          <Text className="text-sm text-black/60 dark:text-white/70 mt-2">
            {description as string}
          </Text>

          {/* Try OUt */}
          <View className="flex-row justify-end items-center my-3">
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

        {/* Bill */}
        <View className="flex-col my-10 mb-20">
          <Text className="text-black dark:text-white text-2xl font-semibold my-2 mt-10 mx-5">
            Bill
          </Text>
          <View className="w-full bg-black/5 dark:bg-white/10 px-5">
            <View className="mt-4 mb-6">
              {colorScheme === "light" ? (
                <Image
                  source={require("@/assets/images/LaFacon.png")}
                  className="w-[114px] h-6 aspect-auto"
                />
              ) : (
                <Image
                  source={require("@/assets/images/LaFacon_white.png")}
                  className="w-[114px] h-6 aspect-auto"
                />
              )}
            </View>
            <View className="flex-row justify-between items-center my-3">
              <Text className="text-black dark:text-white text-lg">Count</Text>
              <Text className="text-black dark:text-white text-lg text-right">
                Price
              </Text>
            </View>
            <View className="flex-row justify-between items-center my-3">
              <View className="flex-row items-center gap-3">
                <AntDesign
                  name="minuscircleo"
                  size={24}
                  color={colorScheme === "light" ? "black" : "white"}
                  onPress={() => setCount(count > 1 ? count - 1 : 1)}
                />
                <Text className="text-xl dark:text-white">{count}</Text>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={colorScheme === "light" ? "black" : "white"}
                  onPress={() => setCount(count + 1)}
                />
              </View>
              <Text className="text-2xl font-extrabold dark:text-white">
                ${numericPrice * count}
              </Text>
            </View>
            <View className="flex-row justify-end items-center my-3">
              <TouchableOpacity className="flex-row justify-center rounded-full border border-black/90 dark:border-white/90 p-3 w-36 self-end">
                <Text className="text-black dark:text-white font-bold">
                  Buy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
