import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import Meds from "../screens/Meds";
import AddMeds from "../screens/AddMeds";

const Stack = createNativeStackNavigator();

export default function MedsStackNav() {
  return (
    <Stack.Navigator initialRouteName="Medicines">
      <Stack.Screen
        name="Medicines"
        component={Meds}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Add" component={AddMeds} />
    </Stack.Navigator>
  );
}
