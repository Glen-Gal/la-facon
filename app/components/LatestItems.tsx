import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

export default function LatestItems() {
  return (
    <View className="px-5">
      <View className="mb-2 mt-6">
        <Text className="text-3xl font-semibold text-black dark:text-white">
          Latest Items
        </Text>
      </View>
      <View className="mb-5 pb-5">
        <View className="flex-row mb-5">
          <View className="flex-1">
            <Text className="text-lg my-2 text-black dark:text-white">
              Skims Sweater
            </Text>
            <Text className="text-black dark:text-white">Women</Text>
            <Text className="text-black dark:text-white">Sizes: S, M, XL</Text>
          </View>
          <View className="ml-2">
            <Image
              source={require("@/assets/images/yolo.png")}
              className="w-16 h-16"
            />
          </View>
        </View>
        {/* Repeat for additional items */}
        <View className="flex-row mb-5">
          <View className="flex-1">
            <Text className="text-lg my-2 text-black dark:text-white">
              Skims Sweater
            </Text>
            <Text className="text-black dark:text-white">Women</Text>
            <Text className="text-black dark:text-white">Sizes: S, M, XL</Text>
          </View>
          <View className="ml-2">
            <Image
              source={require("@/assets/images/yolo.png")}
              className="w-16 h-16"
            />
          </View>
        </View>
        <View className="flex-row mb-5">
          <View className="flex-1">
            <Text className="text-lg my-2 text-black dark:text-white">
              Skims Sweater
            </Text>
            <Text className="text-black dark:text-white">Women</Text>
            <Text className="text-black dark:text-white">Sizes: S, M, XL</Text>
          </View>
          <View className="ml-2">
            <Image
              source={require("@/assets/images/yolo.png")}
              className="w-16 h-16"
            />
          </View>
        </View>
        <View className="flex-row mb-5">
          <View className="flex-1">
            <Text className="text-lg my-2 text-black dark:text-white">
              Skims Sweater
            </Text>
            <Text className="text-black dark:text-white">Women</Text>
            <Text className="text-black dark:text-white">Sizes: S, M, XL</Text>
          </View>
          <View className="ml-2">
            <Image
              source={require("@/assets/images/yolo.png")}
              className="w-16 h-16"
            />
          </View>
        </View>
        <View className="flex-row mb-5">
          <View className="flex-1">
            <Text className="text-lg my-2 text-black dark:text-white">
              Skims Sweater
            </Text>
            <Text className="text-black dark:text-white">Women</Text>
            <Text className="text-black dark:text-white">Sizes: S, M, XL</Text>
          </View>
          <View className="ml-2">
            <Image
              source={require("@/assets/images/yolo.png")}
              className="w-16 h-16"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
