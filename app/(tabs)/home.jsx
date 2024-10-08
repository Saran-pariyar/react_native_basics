import { View, Text, SafeAreaView, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../store/UserStore";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  const userData = useUserAuth((state) => state.userData); // Track userData changes
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);

  // console.log("before: ", isLoggedIn);
  // // useUserAuth.setState({ isLoggedIn: true});
  // console.log("after: ", isLoggedIn);
  // console.log("before logout - userData:", useUserAuth.getState().userData);

  const logOut = () => {
    useUserAuth.setState({ isLoggedIn: false });
    console.log("after logout: ", isLoggedIn);

    useUserAuth.setState({ userData: {} });

    console.log("after logout - userData:", useUserAuth.getState().userData);

    router.replace("/sign-in");
  };

  // for refresh control

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () =>{
    setRefreshing(true)

    // recall videos => if any new videos appear

    setRefreshing(false)

  }

  return (
    <SafeAreaView className="bg-primary pt-4 h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {userData.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState 
          title = "No Videos Found"
          subtitle= "Be the first one to upload a video"
          />
  )}
  refreshControl={ 
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
 }
      />

      <CustomButton
        title="Log Out"
        handlePress={logOut}
        containerStyles="mt-7"
        // setLoading={isSubmitting}
      />
    </SafeAreaView>
  );
};

export default Home;
