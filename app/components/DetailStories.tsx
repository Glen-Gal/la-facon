import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function DetailStories() {
  return (
    <ScrollView
      horizontal={true}
      className="flex-row gap-2 my-2 w-full pl-5"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View className="flex-col justify-center items-center">
        <View className="border-2 border-blue-600 rounded-lg">
          <View className="border-2 border-white bg-black dark:border-black dark:bg-white/[90%] flex-col items-center justify-center w-20 h-20 rounded-lg">
            <Text className="text-lg text-white dark:text-black font-semibold">
              220
            </Text>
          </View>
        </View>
        <Text className="text-sm text-black dark:text-white mt-2">Users</Text>
      </View>
      <View className="flex-col justify-center items-center">
        <View className="border-2 border-indigo-600 rounded-lg">
          <View className="border-2 border-white bg-black dark:border-black dark:bg-white/[90%] flex-col items-center justify-center w-20 h-20 rounded-lg">
            <Text className="text-lg text-white dark:text-black font-semibold">
              12
            </Text>
          </View>
        </View>
        <Text className="text-sm text-black dark:text-white mt-2">Items</Text>
      </View>
      <View className="flex-col justify-center items-center">
        <View className="border-2 border-green-400 rounded-lg">
          <View className="border-2 border-white bg-black dark:border-black dark:bg-white/[90%] flex-col items-center justify-center w-20 h-20 rounded-lg">
            <Text className="text-lg text-white dark:text-black font-semibold">
              24
            </Text>
          </View>
        </View>
        <Text className="text-sm text-black dark:text-white mt-2">
          Delivered
        </Text>
      </View>
      <View className="flex-col justify-center items-center">
        <View className="border-2 border-yellow-400 rounded-lg">
          <View className="border-2 border-white bg-black dark:border-black dark:bg-white/[90%] flex-col items-center justify-center w-20 h-20 rounded-lg">
            <Text className="text-lg text-white dark:text-black font-semibold">
              6
            </Text>
          </View>
        </View>
        <Text className="text-sm text-black dark:text-white mt-2">Pending</Text>
      </View>
      <View className="flex-col justify-center items-center mr-10">
        <View className="border-2 border-red-400 rounded-lg">
          <View className="border-2 border-white bg-black dark:border-black dark:bg-white/[90%] flex-col items-center justify-center w-20 h-20 rounded-lg">
            <Text className="text-lg text-white dark:text-black font-semibold">
              2
            </Text>
          </View>
        </View>
        <Text className="text-sm text-black dark:text-white mt-2">
          Canceled
        </Text>
      </View>
    </ScrollView>
  );
}
