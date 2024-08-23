import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [getTitle, setGetTitle] = useState(title);

  function passwordVisibility() {
    if (getTitle == "Password") {
      setGetTitle("text");
    } else {
      setGetTitle("Password");
    }
  }

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="relative w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        {title === "Password" && (
          <TouchableOpacity
            className="absolute right-2 p-2 z-10 bg-black-100"
            onPress={passwordVisibility}
          >
            <Text className="text-xl">👁️</Text>
          </TouchableOpacity>
        )}

        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          // if title is password, it show star in input
          secureTextEntry={getTitle === "Password" && !showPassword}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
