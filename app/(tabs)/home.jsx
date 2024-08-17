import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <SafeAreaView>
    
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