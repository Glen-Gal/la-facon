import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Image, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import ProductsList from "../components/ProductList";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center relative justify-center bg-white dark:bg-black">
      <View
        className={"flex-row w-full px-4 pb-2 pt-4 justify-between items-end"}
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
              router.push("/admin");
            }}
          >
            <AntDesign
              name="pluscircleo"
              size={24}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ProductsList />
      <StatusBar style={colorScheme === "dark" ? "dark" : "light"} />
    </SafeAreaView>
  );
}
