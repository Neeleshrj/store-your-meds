import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Account, Databases, Query } from "appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

//hooks
import useAppWrite from "../hooks/useAppWrite";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { client, dbId } = useAppWrite();

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const account = new Account(client);
  const databases = new Databases(client);

  const getTokenFromAsyncStorage = async () => {
    try {
      const res = await AsyncStorage.getItem("token");
      setToken(res);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const storeTokenInAsyncStorage = async (t) => {
    try {
      const res = await AsyncStorage.setItem("token", t);
      setToken(t);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const logout = async () => {
    Alert.alert("Logout?", "", [
      {
        text: "Cancel",
        onPress: null,
      },
      {
        text: "Yes",
        onPress: async () => {
          try {
            setToken(null);
            await AsyncStorage.removeItem("token");
            return true;
          } catch (e) {
            console.log(e);
            return false;
          }
        },
      },
    ]);
  };

  const login = (email, pass) => {
    setLoading(true);
    account
      .createEmailSession(email, pass)
      .then((res) => {
        console.log(res);
        storeTokenInAsyncStorage(res.$id);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        Alert.alert("Error!", e.message, [
          {
            text: "Retry",
            onPress: () => null,
          },
        ]);
      });
  };

  const register = (email, pass, confirmPass, name) => {
    if (pass !== confirmPass) {
      Alert.alert("Error!", "Password and confirm password not the same!", [
        {
          text: "Retry!",
          onPress: () => null,
        },
      ]);
      return;
    }
    setLoading(true);
    account
      .create("unique()", email, pass, name)
      .then((res) => setLoading(false))
      .catch((e) => {
        setLoading(false);
        Alert.alert("Error!", e.message, [
          {
            text: "Retry",
            onPress: () => null,
          },
        ]);
      });
  };

  useEffect(() => {
    getTokenFromAsyncStorage();
  }, []);

  useEffect(() => {
    getTokenFromAsyncStorage();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token: token,
        register,
        login,
        logout,
        storeTokenInAsyncStorage,
        getTokenFromAsyncStorage,
        loading,
        databases,
        dbId,
        Query
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
