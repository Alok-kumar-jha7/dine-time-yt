// SignUp.jsx
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
import { Ionicons } from "@expo/vector-icons"; 
import logo from "../../assets/images/dinetimelogo.png";
import entry from "../../assets/images/cup.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleSignUp = async () => {
  if (!name.trim() || !email.trim() || !password) {
    Toast.show({
      type: "error",
      text1: "Error🚫",
      text2: "Please fill all fields.❗",
      visibilityTime: 5000,
      position: "top",
    });
    return;
  }

  if (password !== confirmPassword) {
    Toast.show({
      type: "info",
      text1: "Enter the same password",
      text2: "Passwords do not match.❌",
      visibilityTime: 5000,
      position: "top",
    });
    return;
  }

  setLoading(true);
  try {
   
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

   
    await updateProfile(user, { displayName: name });

   
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        name: name,
        email: email,
        photoURL: user.photoURL || null,
        emailVerified: !!user.emailVerified,
        createdAt: serverTimestamp(), 
      },
      { merge: true } 
    );

    Toast.show({
      type: "success",
      text1: "Account created on DineTime",
      text2: "You’re all set! 🚀",
      visibilityTime: 6000,
      position: "top",
    });

    // navigate after saving profile
    router.replace("/home");
  } catch (error) {
    console.error("Sign up error:", error);
    Toast.show({
      type: "error",
      text1: "Signup Failed❗",
      text2: error.message,
      visibilityTime: 5000,
      position: "top",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LinearGradient colors={["#1a1a1a", "#333333"]} style={styles.gradient}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Image source={logo} style={styles.logo} resizeMode="cover" />
          <Image source={entry} style={styles.heroImage} resizeMode="contain" />

          <View style={styles.formWrapper}>
            <Text style={styles.heading}>Create Account</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#888"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
            />

            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { paddingRight: 44 }]}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((s) => !s)}
                accessibilityLabel={showPassword ? "Hide password" : "Show password"}
              >
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={22} />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, { paddingRight: 44 }]}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword((s) => !s)}
                accessibilityLabel={
                  showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                }
              >
                <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={22} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, loading && styles.disabledButton]}
              activeOpacity={0.8}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.primaryBtnText}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <View style={styles.signInLinkWrapper}>
              <Text style={styles.signInText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/SignIn")}>
                <Text style={styles.signInLink}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Toast />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  gradient: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: { width: 200, height: 100, marginTop: 10 },
  heroImage: { width: 250, height: 240 },
  formWrapper: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 20,
  },
  heading: {
    fontSize: 26,
    color: "#FFA500",
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginBottom: 20,
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
  primaryButton: {
    backgroundColor: "#f49b33",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#555" },
  primaryBtnText: { color: "#fff", fontSize: 16, fontFamily: "outfit-bold" },
  signInLinkWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signInText: { color: "#DDD", fontFamily: "outfit", fontSize: 14 },
  signInLink: { color: "#f49b33", fontFamily: "outfit-bold", fontSize: 14 },
});

export default SignUp;
