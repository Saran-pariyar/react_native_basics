import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, {useEffect} from 'react'
import { useUserAuth } from '../store/UserStore'
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';

const userData = useUserAuth.getState().userData;
const isLoggedIn = useUserAuth.getState().isLoggedIn;

const Home = () => {
  console.log("before: ", isLoggedIn);
  useUserAuth.setState({ isLoggedIn: true});
  console.log("after: ", isLoggedIn);



  useEffect(() => {
    console.log("Home user:", userData); 
  }, [userData, isLoggedIn]);

  const submit = () =>{
    useUserAuth.setState({ isLoggedIn: false });
  console.log("after logout: ", isLoggedIn);
    
    useUserAuth.setState({ userData:{} });
    router.replace("/sign-in")

  }
  return (
    <SafeAreaView>
      <Text>Hello</Text>
      <Text>Hello</Text>

      <Text>Hello</Text>
      <CustomButton
            title="Log Out"
            handlePress={submit}
            containerStyles="mt-7"
            // setLoading={isSubmitting}
          />

    <Text>Welcome: {userData.username}</Text>
      <FlatList
      data={[{id:1}]}
      keyExtractor={(item) => item.id}
      renderItem={({item})=>(
        <Text>{item.id}</Text>
      )}
      />
    
    </SafeAreaView>
  )
}

export default Home