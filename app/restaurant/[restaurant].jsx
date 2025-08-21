import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { db } from "../../config/firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import DatePickerComponent from "../../components/restaurant/DatePickerComponent";
import GuestPickerComponent from "../../components/restaurant/GuestPickerComponent";
import FindSlots from "../../components/restaurant/FindSlots";

const Restaurant = () => {
  const [date, setDate] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGuest, setSelectedGuest] = useState(2);
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState([]);
  const [slotsData, setSlotsData] = useState([]);
  const { restaurant } = useLocalSearchParams();
  const [selectedSlot, setSelectedSlot] = useState(null)
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;

  const handleNextImage = () => {
    const images = carouselData[0]?.images;
    if (images.length === 0) return;

    const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };
  const handlePrevImage = () => {
    const images = carouselData[0]?.images;
    if (images.length === 0) return;

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    setCurrentIndex(prevIndex);
    flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
  };

  const handleLocation = async () => {
    const url = "https://maps.app.goo.gl/3SCvWJqjpW4C9pMD8";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("sorry to open");
    }
  };

  const carouselItem = ({ item }) => (
    <View style={{ width: windowWidth - 2 }} className="h-64 relative">
      <View
        style={{
          position: "absolute",
          top: "40%",
          borderRadius: 50,
          backgroundColor: "rgba(0,0,0,0.1)",
          padding: 5,
          zIndex: 10,
          right: "6%",
        }}
      >
        <Ionicons
          onPress={handleNextImage}
          name="arrow-forward"
          size={24}
          color="white"
        />
      </View>
      <View
        style={{
          position: "absolute",
          top: "40%",
          borderRadius: 50,
          backgroundColor: "rgba(0,0,0,0.1)",
          padding: 5,
          zIndex: 10,
          left: "2%",
        }}
      >
        <Ionicons
          onPress={handlePrevImage}
          name="arrow-back"
          size={24}
          color="white"
        />
      </View>
      <View style={styles.imgeIndicator}>
        {carouselData[0].images?.map((_, index) => (
          <View
            key={index}
            className={`bg-white h-2 w-2 ${index == currentIndex && "h-3 w-3"} p-1 mx-1 rounded-full`}
          />
        ))}
      </View>
      <Image
        source={{ uri: item }}
        style={{
          opacity: 0.8,
          backgroundColor: "black",
          marginRight: 20,
          marginLeft: 5,
          borderRadius: 25,
        }}
        className="h-64"
      />
    </View>
  );

  const getRestaurantData = async () => {
    try {
      const restaurantQuery = query(
        collection(db, "restaurants"),
        where("name", "==", restaurant)
      );
      const restaurantSnapshot = await getDocs(restaurantQuery);

      if (restaurantSnapshot.empty) {
        console.log("No restaurant data found.");
        return;
      }

      for (const doc of restaurantSnapshot.docs) {
        const data = doc.data();
        setRestaurantData(data);

        const carouselSnapshot = await getDocs(collection(db, "carousel"));
        carouselSnapshot.docs.forEach((doc) => {
          where("res_id:", doc.data().res_id);
        });

        const carouselImages = [];
        if (!carouselSnapshot.empty) {
          carouselSnapshot.docs.forEach((carouselDoc) => {
            carouselImages.push(carouselDoc.data());
          });
          setCarouselData(carouselImages);
        } else {
          console.log("No carousel data found.");
        }

        const slotsSnapshot = await getDocs(
          collection(db, "slots"),
          where("res_id", "==", doc.ref)
        );
        if (slotsSnapshot.empty) {
          console.log("heloo ", slotsSnapshot);
        }

        const slots = [];
        if (!slotsSnapshot.empty) {
          slotsSnapshot.docs.forEach((slotDoc) => {
            slots.push(slotDoc.data());
          });
          setSlotsData(slots[0]?.slot);
        } else {
          console.log("No slots data found.");
        }
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  useEffect(() => {
    getRestaurantData();
  }, []);

  // console.log("Restaurant:", restaurantData);
  // console.log("Carousel:", carouselData);
  // console.log("Slots:", slotsData);

  return (
    <SafeAreaView
      style={[
        styles.screen,
        { paddingTop: Platform.OS === "android" ? 25 : 0 },
      ]}
    >
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-3">
          <Text className="text-xl text-[#f49b33] mr-3 font-semibold">
            {restaurant}
          </Text>
          <View className="border-b-2 border-[#f49b33]" />
        </View>
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
          <FlatList
            ref={flatListRef}
            data={carouselData[0]?.images || []}
            renderItem={carouselItem}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={{ borderRadius: 25 }}
          />
        </View>
        <View className="flex-1 flex-row mt-2 p-2 ">
          <Ionicons name="location-sharp" size={26} color="#f49b33" />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.address} |{" "}
            <Text
              onPress={handleLocation}
              className="underline flex items-center  text-[#f49b33] italic font-senibold mt-1"
            >
              Get Direction
            </Text>
          </Text>
        </View>
        <View className="flex-1 flex-row mt-2 p-2 ">
          <Ionicons name="time" size={20} color="#c2c2c2ff" />
          <Text className="max-w-[75%] mx-2 font-semibold text-white">
            {restaurantData?.opening}- {restaurantData?.closing}
          </Text>
        </View>
        <View className="flex-1 border m-2 p-2 border-[#f49b33] rounded-lg shadow-sm ">
          <View className="flex-1 flex-row m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="calendar" size={20} color="#f49b33" />
              <Text className="text-white mx-2">Select Booking Date</Text>
            </View>
            <DatePickerComponent date={date} setDate={setDate} />
          </View>
          <View className="flex-1 flex-row bg-[#474747] rounded-lg m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="people" size={20} color="#f49b33" />
              <Text className="text-white mx-2">Select Number of Guest</Text>
            </View>
            <GuestPickerComponent
              selectedGuest={selectedGuest}
              setSelectedGuest={setSelectedGuest}
            />
          </View>
        </View>
        <View className="flex-1">
          <FindSlots restaurant={restaurant} date={date} selectedGuest={selectedGuest} slots={slotsData} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}  />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  imgeIndicator: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: "50%",
    transform: [{ translateX: -50 }],
    zIndex: 10,
    bottom: 15,
  },
});

export default Restaurant;
