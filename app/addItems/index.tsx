import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "nativewind";
import { useRouter } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";

const addItems = () => {
  const [name, setName] = useState("");
  const [sexValue, setSexValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isSizePickerVisible, setSizePickerVisible] = useState(false);
  const [description, setDescription] = useState("");
  const { colorScheme } = useColorScheme();

  const sexOptions = ["Male", "Female", "Non-binary"];
  const typeOptions = ["Clothing", "Electronics", "Furniture", "Other"];
  const sizeOptions = ["small", "medium", "large", "extra-large"];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    try {
      // Create form data
      const formData = new FormData();
      formData.append("clothe_name", name);
      formData.append("size", size); // Updated to use single string for size
      formData.append("desc", description);
      formData.append("price", price); // Updated to use price input
      if (image) {
        formData.append("image", {
          uri: image,
          name: new Date().toISOString().replace(/:/g, "-") + "_img.jpg",
          type: "image/jpeg",
        } as any);
      }

      // Make POST request to the endpoint
      const response = await fetch(
        "https://fashion-app-5msi.onrender.com/admin/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check if request was successful
      if (response.ok) {
        const data = await response.json();
        useRouter().back();
        console.log("Clothes added successfully:", data);
        // Optionally navigate to a success page or show a success message
      } else {
        const errorData = await response.json();
        console.error("Failed to add clothes:", errorData);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error("Error adding clothes:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <SafeAreaView className="bg-white dark:bg-black flex-1 relative">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="w-full pl-3 pt-4 pb-2">
          <TouchableOpacity
            onPress={() => {
              useRouter().back();
            }}
          >
            <EvilIcons
              name="arrow-left"
              size={36}
              color={colorScheme === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          className="px-5 mb-10"
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <View className="mb-2 mt-4 w-full flex-col">
            <Text className="text-3xl font-semibold text-black dark:text-white text-start">
              Item Upload
            </Text>
          </View>
          <View className="flex-1 justify-center mb-96">
            <View className="mb-4 w-64 h-64">
              <TouchableOpacity
                className="flex-1 justify-center items-center border rounded-lg border-black/5 dark:border-white/25"
                onPress={pickImage}
              >
                {image ? (
                  <Image
                    source={{ uri: image }}
                    className="w-full h-full rounded-lg"
                  />
                ) : (
                  <>
                    <Text className="text-lg text-black/50 dark:text-white/50">
                      Product Shot
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Description */}
            <View className="mt-6 mb-2 w-full">
              <TextInput
                className="h-24 w-full border border-black/5 dark:border-white/25 rounded-lg px-2 mb-4 text-black dark:text-white"
                placeholder="Description"
                placeholderTextColor={colorScheme === "dark" ? "gray" : "gray"}
                multiline={true}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            {/* Name */}
            <TextInput
              className="h-12 w-full border border-black/5 dark:border-white/25 rounded-lg px-2 mb-4 text-black dark:text-white"
              placeholder="Name"
              placeholderTextColor={colorScheme === "dark" ? "gray" : "gray"}
              value={name}
              onChangeText={setName}
            />

            {/* Size */}
            <View className="w-full mb-4">
              <TouchableOpacity
                className="h-12 border border-black/5 dark:border-white/25 rounded-lg px-2 justify-center"
                onPress={() => setSizePickerVisible(true)}
              >
                <Text
                  className={`${
                    size
                      ? "text-black dark:text-white"
                      : "text-black/50 dark:text-white/50"
                  }`}
                >
                  {size || "Select size"}
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              visible={isSizePickerVisible}
              transparent={true}
              animationType="slide"
            >
              <View className="flex-1 justify-center bg-black bg-opacity-50">
                <View className="bg-white dark:bg-gray-800 m-5 p-5 rounded-lg">
                  <Picker
                    selectedValue={size}
                    onValueChange={(itemValue) => {
                      setSize(itemValue);
                      setSizePickerVisible(false);
                    }}
                  >
                    {sizeOptions.map((option) => (
                      <Picker.Item
                        key={option}
                        label={option}
                        value={option}
                        color={colorScheme === "dark" ? "white" : "black"}
                      />
                    ))}
                  </Picker>
                  <Button
                    title="Close"
                    onPress={() => setSizePickerVisible(false)}
                  />
                </View>
              </View>
            </Modal>

            {/* Price */}
            <TextInput
              className="h-12 w-full border border-black/5 dark:border-white/25 rounded-lg px-2 mb-4 text-black dark:text-white"
              placeholder="Price"
              placeholderTextColor={colorScheme === "dark" ? "gray" : "gray"}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <TouchableOpacity
              className="flex-row h-12 justify-center items-center rounded-full bg-blue-600 mt-2 w-full self-center"
              onPress={handleSubmit}
            >
              <Text className="text-white font-semibold">Upload</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default addItems;
