import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Camera } from "expo-camera";
import { useColorScheme } from "nativewind";
import CameraOverlayComponent from "../components/CameraOverlayComponent";
import { ImageSourcePropType } from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const TryOut: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const router = useRouter();
  const { image } = useLocalSearchParams(); // Get the image parameter
  const imageSource: ImageSourcePropType = { uri: image as string };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView className="flex-1 flex-col justify-center items-center bg-white dark:bg-black">
      <View className="w-full px-2 pt-4 absolute top-9 left-0 z-10">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <EvilIcons
            name="arrow-left"
            size={38}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
      </View>
      {!showCamera && (
        <View className="w-full h-full flex-row justify-center items-center relative">
          <View className="w-9 h-9 rounded-full flex-row justify-center items-center bg-black dark:bg-white">
            <Feather
              name="lock"
              size={18}
              color={colorScheme === "light" ? "white" : "black"}
            />
          </View>
          <View className="absolute bottom-10">
            <TouchableOpacity
              onPress={() => setShowCamera(true)}
              className="flex-row justify-center rounded-full border border-black/90 dark:border-white/90 py-3 w-48"
            >
              <Text className="text-black dark:text-white">
                Allow Permission
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showCamera && (
        <CameraOverlayComponent
          image={imageSource}
          onClose={() => setShowCamera(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default TryOut;
