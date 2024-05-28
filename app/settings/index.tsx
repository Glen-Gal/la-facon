import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useColorScheme } from "nativewind";
import {
  EvilIcons,
  MaterialCommunityIcons,
  Feather,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";

export default function Settings() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter();

  const [isEnabled, setIsEnabled] = useState(false);
  const [isFutureEnabled, setIsFutureEnabled] = useState(false);

  return (
    <SafeAreaView className="bg-white dark:bg-black flex-1 relative p-5">
      <View className="w-full px-2 pt-4">
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
      <View className="pt-4 px-4">
        <Text className="text-4xl font-semibold text-black dark:text-white">
          Settings
        </Text>
        <View className="flex-col w-full justify-center items-center mt-2 bg-black/[3%] dark:bg-[#1c1c1e] rounded-xl px-5 py-2">
          {/* Future Updates for now I will keep it blank Anup */}
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
              <Text className="text-black dark:text-white text-sm">
                CEO of YOLO
              </Text>
            </View>
          </View>

          <View className="w-full py-2 flex-row justify-start items-center">
            <Text className="text-[12px] text-black dark:text-white">
              Photography | Videography | Editing
            </Text>
          </View>
        </View>
        <View className="flex-col w-full justify-center items-center mt-6 bg-black/[3%] dark:bg-[#1c1c1e] rounded-xl px-5">
          <View className="flex-row w-full justify-between items-center">
            <View className="bg-[#6051d4] p-2 rounded-lg">
              <MaterialCommunityIcons
                name="weather-night"
                size={16}
                color="white"
              />
            </View>
            <View className="flex-row flex-1 ml-6 justify-between items-center border-b border-black/5 dark:border-white/5 py-2">
              <Text className="text-black dark:text-white text-[16px]">
                {colorScheme === "dark" ? "Dark Mode" : "Light Mode"}
              </Text>
              <Switch
                value={colorScheme === "dark"}
                onChange={toggleColorScheme}
                style={{ transform: [{ scale: 1 }] }}
              />
            </View>
          </View>
          <View className="flex-row w-full justify-between items-center">
            <View className="bg-[#3a86fa] p-2 rounded-lg">
              <Feather name="lock" size={16} color="white" />
            </View>
            <View className="flex-row flex-1 ml-6 justify-between items-center border-b border-black/5 dark:border-white/5 py-2">
              <Text className="text-black dark:text-white text-[16px]">
                Airlock Security
              </Text>
              <Switch
                value={isEnabled}
                onChange={() => setIsEnabled(!isEnabled)}
                style={{ transform: [{ scale: 1 }] }}
              />
            </View>
          </View>
          <View className="flex-row w-full justify-between items-center">
            <View className="bg-black dark:bg-white p-2 rounded-lg">
              <MaterialIcons
                name="fingerprint"
                size={16}
                color={colorScheme === "light" ? "white" : "black"}
              />
            </View>
            <View className="flex-row flex-1 ml-6 justify-between items-center py-2">
              <Text className="text-black dark:text-white text-[16px]">
                Authentication
              </Text>
              <Switch
                value={isFutureEnabled}
                onChange={() => setIsFutureEnabled(!isFutureEnabled)}
                style={{ transform: [{ scale: 1 }] }}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
