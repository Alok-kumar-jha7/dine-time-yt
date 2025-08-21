import React, { useEffect, useState, } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageBackground,
  Platform,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { BlurView } from "expo-blur";
import { collection, query,getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig"; 

const { width } = Dimensions.get('window');

const Home = () => {
  const router = useRouter();

  const[restaurants, setRestaurants] = useState([]);

  const renderDiscountItem = ({ item }) => (
    <TouchableOpacity onPress={()=>router.push(`/restaurant/${item.name}`)} style={styles.discountCard}>
      <Image 
        resizeMode="cover"
        source={{ uri: item.image }}
        style={styles.discountImage}
      />
      <View style={styles.discountOverlay}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>30% OFF</Text>
        </View>
      </View>
      <View style={styles.discountInfo}>
        <Text style={styles.discountTitle}>{item.name}</Text>
        <Text style={styles.discountSubtitle}>{item.address}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.openIndicator} />
          <Text style={styles.timeText}>Open • {item.opening} - {item.closing}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity style={styles.restaurantCard}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          source={{ uri: item.image }}
          style={styles.restaurantImage}
        />
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>4.8 ⭐</Text>
        </View>
      </View>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.restaurantAddress} numberOfLines={1}>{item.address}</Text>
        <View style={styles.timeContainer}>
          <View style={styles.openIndicator} />
          <Text style={styles.timeText}>Open • {item.opening} - {item.closing}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  const getRestaurants = async () => { 
    const q = query(collection(db, "restaurants"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      setRestaurants(prev => [...prev, item.data()]);
    });
  }
   useEffect(() => {
     getRestaurants();
    }, []);
  return (
    <SafeAreaView style={[styles.screen, { paddingTop: Platform.OS === "android" ? 25 : 0 }]}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerCard}>
          <View style={styles.headerContent}>
            <Text style={styles.welcome}>
              Welcome to{" "}
              <Text style={styles.brand}>
                Dine<Text style={styles.brandAccent}>Time</Text>
              </Text>
            </Text>
            <Text style={styles.subtitle}>Discover amazing restaurants near you</Text>
          </View>
          <View style={styles.headerIcon}>
            <Text style={styles.iconText}>🍽️</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Hero Banner */}
        <ImageBackground
          style={styles.heroBanner}
          source={require("../../assets/images/homeBanner.png")}
          resizeMode="cover"
        >
          <BlurView
            intensity={Platform.OS === "android" ? 60 : 20}
            tint="dark"
            style={styles.heroBlur}
          >
            <Text style={styles.heroTitle}>Dine with loved ones</Text>
            <Text style={styles.heroSubtitle}>Book your perfect dining experience</Text>
          </BlurView>
        </ImageBackground>

        {/* Special Discounts Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}> Special Discounts 🥳🎊</Text>
          </View>
          
          {restaurants.length > 0 ? (
            <FlatList
              data={restaurants.slice(0, 5)}
              renderItem={renderDiscountItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <ActivityIndicator
              size="large"
              color="#FF6B35"
              style={styles.loading}
            />
          )}
        </View>

        {/* Top Restaurants Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}> Top Restaurants 🏆</Text>
          
          </View>
          
          {restaurants.length > 0 ? (
            <FlatList
              data={restaurants}
              renderItem={renderRestaurantItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <ActivityIndicator
              size="large"
              color="#FF6B35"
              style={styles.loading}
            />
          )}
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  scrollView: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flex: 1,
  },
  welcome: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  brand: {
    color: "#FF6B35",
  },
  brandAccent: {
    color: "#FFD23F",
  },
  subtitle: {
    color: "#a0a0a0",
    fontSize: 14,
    fontWeight: "400",
  },
  headerIcon: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(255, 107, 53, 0.1)",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 24,
  },
  heroBanner: {
    height: 180,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  heroBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
    fontWeight: "500",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },

  discountCard: {
    width: 280,
    height: 230,
    backgroundColor: "#2a2a2a",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  discountImage: {
    width: "100%",
    height: 110,

  },
  discountOverlay: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  discountBadge: {
    backgroundColor: "#FF6B35",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  discountText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  discountInfo: {
    padding: 12,
    flex: 1,
    justifyContent: "center",
  },
  discountTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
     marginTop: 15,
  },
  discountSubtitle: {
    color: "#a0a0a0",
    fontSize: 12,
    marginBottom: 10,
   
  },


  restaurantCard: {
    width: 220,
    backgroundColor: "#2a2a2a",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  imageContainer: {
    position: "relative",
  },
  restaurantImage: {
    width: "100%",
    height: 120,
  },
  ratingContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  restaurantInfo: {
    padding: 12,
  },
  restaurantName: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  restaurantAddress: {
    color: "#a0a0a0",
    fontSize: 12,
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  openIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 6,
  },
  timeText: {
    color: "#4CAF50",
    fontSize: 11,
    fontWeight: "500",
  },

  flatListContainer: {
    paddingHorizontal: 16,
  },
  separator: {
    width: 12,
  },
  loading: {
    marginVertical: 40,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default Home; 