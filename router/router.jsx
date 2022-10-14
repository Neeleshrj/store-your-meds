import { NavigationContainer } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

import Auth from "../screens/Auth";
import MedsStackNav from "./MedsStackNav";

export default function Router() {
  const {token} = useAuth();

  return (
    <NavigationContainer>
      {token === null ? (
        <Auth />
      ) : (
        <MedsStackNav />
      )}
    </NavigationContainer>
  );
}
