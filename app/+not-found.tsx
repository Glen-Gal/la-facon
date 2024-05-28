import { useRouter } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-white dark:bg-black flex-1 justify-center items-center relative p-5">
      <Text className="text-4xl font-semibold text-black dark:text-white mb-4">
        Page Not Found
      </Text>
      <TouchableOpacity
        onPress={() => {
          router.dismissAll();
        }}
      >
        <Text className="text-blue-600 dark:text-blue-400">
          Go back to home
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
