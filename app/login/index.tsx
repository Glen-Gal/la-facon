import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [err, setErr] = useState("");

  const router = useRouter();
  const { colorScheme } = useColorScheme();

  // Static email and password
  const staticEmail = "admin@test.com";
  const staticPassword = "123";

  const handleLogin = () => {
    let valid = true;

    if (email !== staticEmail) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (password !== staticPassword) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (valid) {
      router.push("/admin");
    } else {
      setErr("Invalid email or password. Please try again.");
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot password link pressed");
  };

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
      <View className="flex-1 mt-16 items-center">
        {colorScheme === "light" ? (
          <Image
            source={require("@/assets/images/logo_black.png")}
            style={{ alignSelf: "center" }}
            className="w-12 h-12 aspect-auto"
          />
        ) : (
          <Image
            source={require("@/assets/images/logo_white.png")}
            style={{ alignSelf: "center" }}
            className="w-12 h-12 aspect-auto"
          />
        )}
        <Text className="text-4xl font-semibold my-2 text-black dark:text-white">
          Login
        </Text>
        <Text className="w-64 text-center text-black/50 dark:text-white/50">
          Hello there, only admins get to upload clothes. Login to continue.
        </Text>
        <Text className="w-64 text-center text-red-500 text-xs mt-4 -mb-2">
          {err ? err : null}
        </Text>
        <TextInput
          className={`w-4/5 h-12 border ${
            emailError
              ? "border-red-500"
              : "border-black/5 dark:border-white/[15%]"
          } text-black dark:text-white rounded-lg mt-10 mb-2 px-2`}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
        />
        <TextInput
          className={`w-4/5 h-12 border ${
            passwordError
              ? "border-red-500"
              : "border-black/5 dark:border-white/[15%]"
          } text-black dark:text-white rounded-lg mb-2 px-2`}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
        />
        <TouchableOpacity
          className="flex-row justify-center rounded-full border bg-black dark:bg-white p-3 mt-2 w-4/5 self-center"
          onPress={handleLogin}
        >
          <Text className="text-white dark:text-black font-bold">Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword} className="mt-4 w-4/5">
          <Text className="text-blue-600 self-end">Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={require("@/assets/images/1__tKdt8O7LkoLbjqwRS8kPw.jpg")}
          className="w-[455.62px] h-64 aspect-auto self-center opacity-5 blur-2xl"
        />
      </View>
    </SafeAreaView>
  );
}
