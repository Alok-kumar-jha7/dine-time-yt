import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FindSlots = ({
  date,
  slots,
  setSelectedGuest,
  selectedSlot,
  setSelectedSlot,
}) => {
  const [slotsVisible, setSlotsVisible] = useState(false);
  const visiblitySlot = () => {
    setSlotsVisible(!slotsVisible);
  };
  const handleSlotPress = (slot) => {
    let prevSlot = selectedSlot;
    if (prevSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };
  return (
    <View classNme="flex-1">
      <View className={`flex ${selectedSlot != null && "flex-row "}`}>
        <View className={`${selectedSlot != null && "flex-1"}`}>
          <TouchableOpacity onPress={visiblitySlot}>
            <Text className="text-center text-lg font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
              {" "}
              Find Slots
            </Text>
          </TouchableOpacity>
        </View>
        {selectedSlot != null && (
          <View className="flex-1">
            <TouchableOpacity >
              <Text className="text-center text-lg text-white font-semibold bg-[#f49b33] p-2 my-3 mx-2 rounded-lg">
                {" "}
                Book Slot
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {slotsVisible && (
        <View className="flex-wrap flex-row mx-2 p-2 bg-[#474747] rounded-lg">
          {slots.map((slot, index) => (
            <TouchableOpacity
              onPress={() => handleSlotPress(slot)}
              disabled={
                selectedSlot === slot || selectedSlot == null ? false : true
              }
              key={index}
              className={` m-2 p-4 bg-[#f49b33] rounded-lg items-cnter justify-cnter ${selectedSlot && selectedSlot !==slot ?"opacity-40":""} `}
            >
              <Text className="text-white font-bold ">{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default FindSlots;
