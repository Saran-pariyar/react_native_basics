import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, {useEffect} from 'react'
import { useUserAuth } from '../store/UserStore'
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';



const Home = () => {
  const userData = useUserAuth((state) => state.userData); // Track userData changes
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);

  console.log("before: ", isLoggedIn);
  // useUserAuth.setState({ isLoggedIn: true});
  console.log("after: ", isLoggedIn);
  console.log("before logout - userData:", useUserAuth.getState().userData);


  const submit = () =>{
    useUserAuth.setState({ isLoggedIn: false });
  console.log("after logout: ", isLoggedIn);
    
    useUserAuth.setState({ userData:{} });

    console.log("after logout - userData:", useUserAuth.getState().userData);

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