import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);

    try {
      const response = await fetch('http://192.168.10.105:6000/api/v1/users/register?', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Sign up successful:', data);

        // Show success alert
        Alert.alert(
          'Sign Up Successful',
          data.message || 'You have signed up successfully!',
          [{ text: 'OK' }]
        );
      } else {
        console.error('Sign up failed:', data.message);

        // Show error alert
        Alert.alert(
          'Sign Up Failed',
          data.message || 'An error occurred during sign up. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error:', error.message, error);

      // Show error alert for network errors
      Alert.alert(
        'Network Error',
        'There was an error connecting to the server. Please check your network connection and try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>

            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary">
              Sign in
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
