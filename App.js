import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNav from './src/components/Stack';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <StackNav setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
    
    </NavigationContainer>
    
    );
}