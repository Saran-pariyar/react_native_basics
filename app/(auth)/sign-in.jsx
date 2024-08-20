import { View, Text, ScrollView, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
// import { useGlobalContext } from "../../context/GlobalProvider";
// import { loginFunc } from "../../lib/auth_functions";

import { useUserAuth } from "../store/UserStore";

const ipAddress = useUserAuth.getState().ipAddress;
const userData = useUserAuth.getState().userData;
const loading = useUserAuth.getState().loading;

const SignIn = () => {
  // let bears = useStore((state) => state.bears)
  const [changeStatus, setChangeStatus] = useState(1)
  const [getUserApiData, setGetUserApiData] = useState({})

  
  // const {setLoading} = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("Effect user: ", getUserApiData);
    useUserAuth.setState({ userData: getUserApiData });
    
    console.log("count: ", changeStatus);
    console.log("Zustand user Data: " , useUserAuth.getState().userData);
    
  }, [changeStatus]);
  
  
    const submit = async () => {

      // setLoading(true)
    
      try {
        const response = await fetch(`http://${ipAddress}:6000/api/v1/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // console.log('Login successful:', data);
          setGetUserApiData( {email: data.data.user.email, username: data.data.user.username})

        

          // useUserAuth.setState({ userData: user });
          setChangeStatus(changeStatus + 1)

  
          Alert.alert(
            'Login Successful',
            data.message || 'You have been logged in!',
            [{ text: 'OK' }]
          );
          // router.replace("/home")
        } else {
          console.error('Login failed:', data.message);
    
          
          Alert.alert(
            'Sign In Failed',
            data.message || 'An error occurred during sign in. Please try again.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error:', error.message, error);
    
        
        Alert.alert(
          'Network Error',
          'There was an error connecting to the server. Please check your network connection and try again.',
          [{ text: 'OK' }]
        );
      } finally {
        // setLoading(false)
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
            Log in to Aora 
          </Text>
          <FormField
            title="Email"
            value={form.email}
            //we'll destructure form and modify email
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
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            // setLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>

            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary">
              Signup
            </Link>
          </View>
          <Text>this: </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
