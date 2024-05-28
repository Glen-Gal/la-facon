import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageSourcePropType,
  SafeAreaView,
  Button,
} from "react-native";
import {
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { EvilIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { CameraType } from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

interface CameraOverlayComponentProps {
  onClose: () => void;
  image: ImageSourcePropType;
}

const CameraOverlayComponent: React.FC<CameraOverlayComponentProps> = ({
  onClose,
  image,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const { colorScheme } = useColorScheme();
  const [facing, setFacing] = useState(CameraType.back);
  const cameraRef = useRef<CameraView | null>(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<boolean>(false);
  const [photo, setPhoto] = useState<CameraCapturedPicture>();
  const [imageHeight, setImageHeight] = useState<string>("h-64");
  const [currentSize, setCurrentSize] = useState<string>("Lg");
  const [showSizeOptions, setShowSizeOptions] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        className="z-20"
      >
        <Text>We need your permission to access the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePic = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: false };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  const sharePic = () => {
    if (photo) {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    }
  };

  const savePhoto = () => {
    if (photo) {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    }
  };

  const handleSizeChange = (size: string) => {
    let heightClass;
    switch (size) {
      case "Sm":
        heightClass = "h-56";
        break;
      case "Md":
        heightClass = "h-64";
        break;
      case "Lg":
        heightClass = "h-72";
        break;
      case "XL":
        heightClass = "h-96";
        break;
      default:
        heightClass = "h-64";
    }
    setImageHeight(heightClass);
    setCurrentSize(size);
    setShowSizeOptions(false);
  };

  const availableSizes = ["Sm", "Md", "Lg", "XL"].filter(
    (size) => size !== currentSize
  );

  if (photo) {
    return (
      <SafeAreaView className="flex-1 w-screen h-screen flex-col justify-center items-center z-20">
        <Image
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          className="w-full h-full"
        />
        <View className="absolute bg-white/75 dark:bg-black/75 flex-row gap-2 justify-between items-center bottom-0 rounded-t-3xl h-24 px-8 w-full">
          <TouchableOpacity
            onPress={sharePic}
            className="flex-row justify-between items-center rounded-full border border-black/25 dark:border-white/25 py-3 w-32 relative px-4 pr-8"
          >
            <View className="bg-black/90 dark:bg-white/90 w-6 h-6 rounded-full flex-row justify-center items-center">
              <EvilIcons
                name="share-apple"
                size={18}
                color={colorScheme === "light" ? "white" : "black"}
              />
            </View>

            <Text className="text-black dark:text-white text-xs">Share</Text>
          </TouchableOpacity>
          {hasMediaLibraryPermission ? (
            <TouchableOpacity
              onPress={savePhoto}
              className="flex-row justify-between items-center rounded-full border border-black/25 dark:border-white/25 py-3 w-32 relative px-4 pr-8"
            >
              <View className="bg-black/90 dark:bg-white/90 w-6 h-6 rounded-full flex-row justify-center items-center">
                <MaterialIcons
                  name="save-alt"
                  size={16}
                  color={colorScheme === "light" ? "white" : "black"}
                />
              </View>
              <Text className="text-black dark:text-white text-xs">Save</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View className="absolute z-30 top-8 left-2">
          <TouchableOpacity
            onPress={() => setPhoto(undefined)}
            className="flex-row justify-center items-center relative"
          >
            <View className="bg-white/25 backdrop-blur-2xl rounded-full w-6 h-6 absolute" />
            <EvilIcons
              name="arrow-left"
              size={38}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 z-20 relative flex-col justify-center items-center">
      <View className="absolute z-30 top-8 left-2">
        <TouchableOpacity
          onPress={onClose}
          className="flex-row justify-center items-center relative"
        >
          <View className="bg-white/25 backdrop-blur-2xl rounded-full w-6 h-6 absolute" />
          <EvilIcons
            name="arrow-left"
            size={38}
            color={colorScheme === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
      </View>

      <CameraView
        style={{ flex: 1 }}
        className="w-screen"
        facing={facing}
        ref={cameraRef}
      >
        <View
          className={`flex-1 flex items-center ${
            facing === CameraType.front ? "justify-end mb-20" : "justify-center"
          }`}
        >
          <Image
            source={image}
            className={`${imageHeight}`}
            resizeMode="contain"
          />
        </View>
      </CameraView>

      <View className="absolute top-8 right-4 flex-col">
        <TouchableOpacity
          onPress={() => setShowSizeOptions(!showSizeOptions)}
          className="w-8 h-8 bg-white rounded-full flex justify-center items-center mb-2"
        >
          <Text className="text-black text-xs">{currentSize}</Text>
        </TouchableOpacity>
        {showSizeOptions && (
          <View className="flex-col gap-2">
            {availableSizes.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => handleSizeChange(size)}
                className="w-8 h-8 bg-white rounded-full flex justify-center items-center"
              >
                <Text className="text-black text-sm">{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={toggleCameraFacing}
        className="absolute z-30 bottom-6 right-4"
      >
        <MaterialIcons name="flip-camera-ios" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={takePic}
        className="absolute z-30 bottom-6 w-16 h-16 rounded-full border-2 border-white flex-row justify-center items-center"
      >
        <View className="w-12 h-12 rounded-full bg-white absolute" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CameraOverlayComponent;
