import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/dinetimelogo.png";
import entry from "../assets/images/cup.png";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView className={"bg-stone-950"} style={styles.container}>
      {/* Cross Icon Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => router.push("/home")} // Adjust path to your home page
        >
          <Text style={styles.crossIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Image source={logo} style={styles.image} />
          <Image source={entry} style={{ width: 300, height: 300, marginTop: -90 }} />
          <View>
            <Text style={styles.paragraph}>
              Welcome to DineTime, your ultimate dining companion! 🧡
            </Text>   
            <Text style={[styles.paragraph, { marginTop: 10 }]}>
              Discover  •  Book  •   Enjoy 
            </Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/SignUp")}
            >
              <Text style={styles.buttonText}> Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => router.push("/SignIn")}
            >
              <Text style={styles.buttonText2}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <StatusBar barStyle={"light-content"} className={"bg-stone-950"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 50, // Adjust based on your status bar height
    right: 20,
    zIndex: 10,
  },
  crossButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(244, 155, 51, 0.1)",
    borderWidth: 1,
    borderColor: "#f49b33",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  crossIcon: {
    fontSize: 18,
    color: "#f49b33",
    fontWeight: "bold",
  },
  btnContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#f49b33",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    marginTop: 15,
    height: 52,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
  button2: {
    borderColor: "#f49b33",
    borderWidth: 2,
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "90%",
    height: 55,
  },
  buttonText2: {
    color: "#f49b33",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "outfit",
    height: 20,
  },
  paragraph: {
    fontSize: 20,
    color: "#FFA500",
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
}); 