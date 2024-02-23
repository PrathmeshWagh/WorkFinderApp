import React from 'react'
import MainNavigator from './src/navigation/MainNavigator'
import { PaperProvider } from 'react-native-paper'
const App = () => {
  return (
    <PaperProvider>
      <MainNavigator />
    </PaperProvider>
  )
}

export default App

