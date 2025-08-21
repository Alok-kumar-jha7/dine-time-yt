import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerComponent = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  const handlePress = () => {
    setShow(true);
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };
  return (
    <View classNmae="flex flex-row  ">
      <TouchableOpacity
        onPress={handlePress}
        className={`rounded-lg text-white ${Platform.OS === "android" && "px-4 py-1 justify-center bg-[#474747]"}`}
      >
        {Platform.OS === "android" && (
          <Text className="text-white px-4 py-1  bg-[#474747]">
            {date.toLocaleDateString()}
          </Text>
        )}
        {Platform.OS === "android" && show && (
          <DateTimePicker
            accentColor="#f49b33"
            textColor="#f49b33"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
        {Platform.OS === "ios" && (
          <DateTimePicker
            accentColor="#f49b33"
            textColor="#f49b33"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
            maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerComponent;
