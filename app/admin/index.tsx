import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import LatestItems from "../components/LatestItems";
import DetailStories from "../components/DetailStories";

export default function Admin() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  const handleAddItems = () => {
    router.push("/addItems"); // Navigate to UploadForm screen
  };

  return (
    <SafeAreaView className="bg-white dark:bg-black flex-1 relative">
      <View
        className={"flex-row w-full px-4 pb-2 pt-4 justify-between items-end"}
      >
        <TouchableOpacity
          onPress={() => {
            router.dismissAll();
          }}
        >
          {colorScheme === "light" ? (
            <Image
              source={require("@/assets/images/LaFacon.png")}
              style={{ alignSelf: "center" }}
              className="w-[114px] h-6 aspect-auto"
            />
          ) : (
            <Image
              source={require("@/assets/images/LaFacon_white.png")}
              style={{ alignSelf: "center" }}
              className="w-[114px] h-6 aspect-auto"
            />
          )}
        </TouchableOpacity>

        <View className="flex-row gap-6 justify-center items-end">
          <TouchableOpacity
            onPress={() => {
              router.push("/settings");
            }}
          >
            <Ionicons
              name="settings-outline"
              size={26}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/myItems");
            }}
          >
            <Feather
              name="shopping-bag"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="py-2">
        <DetailStories />

        <View className="itemUpload">
          <View className="mb-2 mt-4 px-5">
            <Text className="text-3xl font-semibold text-black dark:text-white">
              Admin Space
            </Text>
          </View>

          <View className="flex-col mb-5 w-full justify-between bg-[#f5f1eb] dark:bg-[#1c1c1e] h-64 p-4 px-5">
            <View className="pb-4 w-full">
              <Text className="text-lg text-black/50 dark:text-white/75 text-left">
                Bill Calculation
              </Text>
            </View>
            <View className="flex-col w-full flex-1 mb-6 justify-between items-center">
              <View className="flex-col w-full">
                <View className="flex-row w-full pb-2 justify-between items-center">
                  <Text className="text-left text-black dark:text-white">
                    Fee
                  </Text>
                  <Text className="text-right text-black dark:text-white">
                    $ 0.12
                  </Text>
                </View>
                <View className="flex-row w-full pb-2 justify-between items-center">
                  <Text className="text-left text-black dark:text-white">
                    4 Product Shots
                  </Text>
                  <Text className="text-right text-black dark:text-white">
                    $ 0.60
                  </Text>
                </View>
              </View>

              <View className="flex-row w-full justify-between items-center border-t border-black/10 dark:border-white/[15%] pt-2">
                <Text className="text-left text-black dark:text-white">
                  Total
                </Text>
                <Text className="text-right text-black dark:text-white">
                  $ 0.72
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleAddItems}
              className="py-2 px-4 border border-black dark:border-white rounded-full self-end"
            >
              <Text className="text-black dark:text-white text-sm font-semibold">
                Add Items
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-2">
          <View className="mb-2 mt-4 px-3">
            <Text className="text-3xl font-semibold text-black dark:text-white">
              License
            </Text>
          </View>

          <View className="flex-col w-full justify-center items-center mt-2 bg-black/[3%] dark:bg-[#1c1c1e] rounded-xl px-5 py-2">
            {/* This is Just an Idea */}
            <View className="flex-row w-full justify-between items-center">
              <View className="rounded-full overflow-hidden mr-6 w-16 h-16">
                <Image
                  source={require("@/assets/images/anup.jpeg")}
                  style={{ alignSelf: "center" }}
                  className="w-full h-full aspect-auto"
                />
              </View>

              <View className="flex-col py-4 flex-1 justify-center items-start border-b border-black/5 dark:border-white/5">
                <Text className="text-black dark:text-white text-2xl font-semibold">
                  Anup Gurung
                </Text>
                <Text className="text-black dark:text-white text-xs">
                  CEO of YOLO
                </Text>
              </View>
            </View>

            <View className="flex-row w-full justify-between items-center py-4 pt-6">
              <View className="w-1/2">
                <Text className="text-black dark:text-white font-semibold text-left">
                  14/05/2024
                </Text>
                <Text className="text-black/50 dark:text-white text-xs text-left">
                  License Issue Date
                </Text>
              </View>

              <View className="w-1/2">
                <Text className="text-black dark:text-white font-semibold text-right">
                  14/05/2026
                </Text>
                <Text className="text-black/50 dark:text-white text-xs text-right">
                  License Expiry Date
                </Text>
              </View>
            </View>

            <View className="w-full py-2 flex-row justify-center items-center">
              <Text className="text-[8px] text-black/50 dark:text-white/50">
                © 2024 YOLO. All Rights Reserved.
              </Text>
            </View>
          </View>
        </View>

        <LatestItems />
      </ScrollView>
    </SafeAreaView>
  );
}
