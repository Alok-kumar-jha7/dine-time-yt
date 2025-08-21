
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  StyleSheet,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import logo from "../../assets/images/dinetimelogo.png";
import entry from "../../assets/images/cup.png";
import { Ionicons } from "@expo/vector-icons";


const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error🚫",
        text2: "Please enter email and password.❗",
        visibilityTime: 4000,
        position: "top",
      });
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: "success",
        text1: "Signed In✅",
        text2: "Welcome back!🎊",
        visibilityTime: 3000,
        position: "top",
      });
      setTimeout(() => {
        router.replace("/(tabs)/home");
      }, 1200);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Sign-In Failed❗",
        text2: err.message,
        visibilityTime: 5000,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <LinearGradient colors={["#1a1a1a", "#333"]} style={styles.gradient}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Image source={logo} style={styles.logo} />
          <Image source={entry} style={styles.hero} />

          <View style={styles.form}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />

            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { paddingRight: 48 }]}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoComplete="password"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((s) => !s)}
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
              >
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={22} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.disabled]}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={styles.btnText}>
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/SignUp")}>
                <Text style={styles.link}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: { width: 180, height: 60, marginBottom: 20 },
  hero: { width: 250, height: 200, marginBottom: 30 },
  form: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    color: "#FFA500",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
  },
  passwordWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  eyeButton: {
    position: "absolute",
    marginBottom: 15,
    right: 8,
    height: 44,
    width: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#f49b33",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 16, fontFamily: "outfit-bold" },
  disabled: { backgroundColor: "#555" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 15 },
  footerText: { color: "#DDD" },
  link: { color: "#f49b33", marginLeft: 4, fontFamily: "outfit-bold" },

  toastContainerSuccess: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#243b17",
    marginHorizontal: 10,
    minWidth: 200,
  },
  toastContainerError: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#3b1717",
    marginHorizontal: 10,
    minWidth: 200,
  },
  toastIcon: {
    marginRight: 10,
    color: "#fff",
  },
  toastTextWrap: {
    flex: 1,
  },
  toastTitle: {
    color: "#fff",
    fontWeight: "600",
  },
  toastMessage: {
    color: "#eee",
    marginTop: 2,
    fontSize: 12,
  },
});

export default SignIn;
