import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

//components
import Typography from "../../components/Typography";
import PrimaryButton from "../../components/PrimaryButton";
import CustomTextInput from "../../components/TextInput";
import InputContainer from "../../components/InputContainer";

//hooks
import useAuth from "../../hooks/useAuth";

export default function Auth() {
  const { login, register, loading } = useAuth();

  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  if (signUp) {
    return (
      <View style={styles.container}>
        <View
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "#0076FF",
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerTextContainer}>
              <Typography textColor="white1" textWeight="bold" textSize="h1">
                Sign Up
              </Typography>
            </View>
            <View style={{ paddingLeft: "1%" }}>
              <Typography textColor="white1" textWeight="normal" textSize="h5">
                Hello new user!
              </Typography>
            </View>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <View style={styles.inputAreaContainer}>
            <InputContainer
              styling={{
                marginVertical: "4%",
                paddingLeft: "5%",
              }}
            >
              <Ionicons
                name="person-outline"
                size={24}
                color="#0076FF"
                style={{ marginRight: "5%" }}
              />
              <CustomTextInput
                placeholder="Name"
                value={name}
                secureTextEntry={false}
                onChangeText={(val) => setName(val)}
                styling={{ padding: "5%", width: "90%" }}
              />
            </InputContainer>

            <InputContainer
              styling={{
                marginVertical: "4%",
                paddingLeft: "5%",
              }}
            >
              <Ionicons
                name="mail-outline"
                size={24}
                color="#0076FF"
                style={{ marginRight: "5%" }}
              />
              <CustomTextInput
                placeholder="Email"
                value={email}
                secureTextEntry={false}
                onChangeText={(val) => setEmail(val)}
                styling={{ padding: "5%", width: "90%" }}
              />
            </InputContainer>

            <InputContainer
              styling={{ marginVertical: "4%", paddingLeft: "5%" }}
            >
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#0076FF"
                style={{ marginRight: "5%" }}
              />
              <CustomTextInput
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={(val) => setPassword(val)}
                styling={{ padding: "5%", width: "90%" }}
              />
            </InputContainer>

            <InputContainer
              styling={{ marginVertical: "4%", paddingLeft: "5%" }}
            >
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#0076FF"
                style={{ marginRight: "5%" }}
              />
              <CustomTextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={(val) => setConfirmPassword(val)}
                styling={{ padding: "5%", width: "90%" }}
              />
            </InputContainer>
          </View>
          <View
            style={{
              marginBottom: "4%",
              padding: "4%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginBottom: "4%",
              }}
            >
              <Typography textSize="h5">Existing user? </Typography>
              <TouchableOpacity onPress={() => setSignUp(false)}>
                <Typography textSize="h5" textColor="blue1">
                  Sign In
                </Typography>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              borderRadius={32}
              action={() => {
                register(email, password, confirmPassword, name);
              }}
              styling={{ width: "100%" }}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Typography textSize="h5" textColor="white1" textWeight="600">
                  Sign Up
                </Typography>
              )}
            </PrimaryButton>
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "#0076FF",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <View style={styles.headerContainer}>
          <View style={styles.headerTextContainer}>
            <Typography textColor="white1" textWeight="bold" textSize="h1">
              Sign In
            </Typography>
          </View>
          <View style={{ paddingLeft: "1%" }}>
            <Typography textColor="white1" textWeight="normal" textSize="h5">
              Welcome back!
            </Typography>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <View style={styles.inputAreaContainer}>
          <InputContainer
            styling={{
              marginVertical: "4%",
              paddingLeft: "5%",
            }}
          >
            <Ionicons
              name="mail-outline"
              size={24}
              color="#0076FF"
              style={{ marginRight: "5%" }}
            />
            <CustomTextInput
              placeholder="Email"
              value={email}
              secureTextEntry={false}
              onChangeText={(val) => setEmail(val)}
              styling={{ padding: "5%", width: "90%" }}
            />
          </InputContainer>

          <InputContainer styling={{ marginVertical: "4%", paddingLeft: "5%" }}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#0076FF"
              style={{ marginRight: "5%" }}
            />
            <CustomTextInput
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(val) => setPassword(val)}
              styling={{ padding: "5%", width: "90%" }}
            />
          </InputContainer>
        </View>
        <View
          style={{
            marginBottom: "4%",
            padding: "4%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: "4%",
            }}
          >
            <Typography textSize="h5">New user? </Typography>
            <TouchableOpacity onPress={() => setSignUp(true)}>
              <Typography textSize="h5" textColor="blue1">
                Sign Up
              </Typography>
            </TouchableOpacity>
          </View>
          <PrimaryButton
            borderRadius={32}
            action={() => {
              login(email, password);
            }}
            styling={{ width: "100%" }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Typography textSize="h5" textColor="white1" textWeight="600">
                Sign In
              </Typography>
            )}
          </PrimaryButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: "6%",
    marginTop: hp(12),
  },
  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputAreaContainer: {
    padding: "4%",
    flex: 1,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "4%",
  },
});
