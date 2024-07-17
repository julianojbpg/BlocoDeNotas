import { ContextoProvider } from "./src/context/contexto"
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Inicial from './src/pages/Inicial'
import Adicionar from "./src/pages/adicionar"



export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <ContextoProvider>
        <Stack.Navigator >
          <Stack.Screen name="Inicial"
          component={Inicial}
            options={{
              headerShown: false,
              animation: 'simple_push',
            }} />
          <Stack.Screen name="adicionar"
          component={Adicionar}
            options={{
              headerShown: false,
              animation: 'simple_push',
            }} />
        </Stack.Navigator>
      </ContextoProvider>
    </NavigationContainer>

  );
}
