import { router } from "expo-router";
import {Alert } from "react-native";



const ipAddress = "192.168.1.101"

let submitting = false

const loginFunc = async (formData) => {

    submitting = true

    try {
      const response = await fetch(`http://${ipAddress}:6000/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);

        // Show success alert
        Alert.alert(
          'Login Successful',
          data.message || 'You have been logged in!',
          [{ text: 'OK' }]
        );
        router.replace("/home")
      } else {
        console.error('Login failed:', data.message);

        // Show error alert
        Alert.alert(
          'Sign In Failed',
          data.message || 'An error occurred during sign in. Please try again.',
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
      submitting = false
    }
  }

  



  const signUpFunc = async (formData) => {
    submitting = true

    try {
      const response = await fetch(`http://${ipAddress}:6000/api/v1/users/register?`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
        router.replace("/home")
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
      submitting = false
    }
  }

  export {loginFunc, signUpFunc}