import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const GuestPickerComponent = ({selectedGuest, setSelectedGuest}) => {
  const decrement = () => {
    if (selectedGuest > 1) {
      setSelectedGuest(selectedGuest - 1);
    }
  };
  const increment = () => {
    if (selectedGuest < 10) {
      setSelectedGuest(selectedGuest + 1);
    }
  };

  return (
    <View className="flex flex-row items-center rounded-lg text-white text-base ">
      <TouchableOpacity onPress={decrement} className="rounded">
        <Text className="text-white text-lg  border border-[#f49b33] rounded-l-lg px-4 ">
          -
        </Text>
      </TouchableOpacity>
      <Text className="text-white px-2 bg-[#474747] border-[#474747] text-lg border">
        {selectedGuest}
      </Text>
      <TouchableOpacity onPress={increment} className="rounded">
        <Text className="text-white text-lg border border-[#f49b33] rounded-r-lg px-3 ">
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuestPickerComponent;
