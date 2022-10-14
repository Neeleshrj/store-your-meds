import React, { useState } from "react";
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//components
import InputContainer from "../../components/InputContainer";
import CustomTextInput from "../../components/TextInput";

//hooks
import useAuth from "../../hooks/useAuth";

export default function AddMeds({ navigation }) {
  const { token, databases, dbId} = useAuth();
  const [inputs, setInputs] = useState([{ key: "", value: "" }]);
  const [diseaseName, setDiseaseName] = useState("");
  const [loading, setLoading] = useState(false);

  const addHandler = () => {
    const _inputs = [...inputs];
    _inputs.push({ key: "", value: "" });
    setInputs(_inputs);
  };

  const deleteHandler = (key) => {
    const _inputs = inputs.filter((input, index) => index != key);
    setInputs(_inputs);
  };

  const inputHandler = (text, key) => {
    const _inputs = [...inputs];
    _inputs[key].value = text;
    _inputs[key].key = key;
    setInputs(_inputs);
  };

    const storeData = (data) => {
    setLoading(true);
    databases
      .createDocument(dbId, "meds", "unique()", data)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setDiseaseName("");
        setInputs([{ key: "", value: "" }]);
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

  const onSubmit = () => {
    const meds = []
    inputs.map((obj)=> {
      meds.push(obj.value)
    })
    const data = {
      disease_name: diseaseName,
      med_list: meds,
      user_id: token
    };
    Alert.alert("Are you sure you want to add this?", "", [
      {
        text: "Yes",
        onPress: () => {
          storeData(data);
        },
      },
      {
        text: "Cancel",
        style: "cancel",
        onPress: null,
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <View style={styles.btnContainer}>
          <TouchableWithoutFeedback onPress={() => addHandler()}>
            <View style={styles.addButton}>
              <Ionicons name="add-outline" size={34} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss;
            }}
          >
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: "#0076FF" }]}
              onPress={() => onSubmit()}
            >
              <Ionicons name="checkmark-outline" size={34} color="#fff" />
            </TouchableOpacity>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ padding: "4%" }}>
          <InputContainer>
            <CustomTextInput
              placeholder="Disease Name"
              value={diseaseName}
              secureTextEntry={false}
              onChangeText={(disName) => setDiseaseName(disName)}
              styling={{ padding: "5%", width: "100%" }}
            />
          </InputContainer>
        </View>

        <ScrollView>
          {inputs.map((input, key) => (
            <View key={key} style={{ padding: "4%" }}>
              <InputContainer>
                <CustomTextInput
                  placeholder="Medicine Name"
                  value={input.value}
                  secureTextEntry={false}
                  onChangeText={(text) => inputHandler(text, key)}
                  styling={{ padding: "5%", width: "85%" }}
                />
                <TouchableOpacity onPress={() => deleteHandler(key)}>
                  <Ionicons name="remove-outline" size={34} color="red" />
                </TouchableOpacity>
              </InputContainer>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-end",
  },
  tabiconBox: {
    flex: 1,
  },
  tabicon: {
    marginTop: hp("2%"),
    marginLeft: wp("2%"),
    color: "#3498db",
  },
  headerbox: {
    flex: 2,
    alignItems: "flex-end",
    padding: 20,
    alignSelf: "flex-end",
  },
  btnContainer: {
    marginTop: hp("4%"),
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  addButton: {
    backgroundColor: "#2ecc71",
    padding: "2%",
    borderRadius: 100,
    marginVertical: hp("1%"),
    marginHorizontal: wp("5%"),
    justifyContent: "center",
    alignItems: "center",
  },
  delButton: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp("1%"),
    marginRight: wp("2%"),
    textAlign: "center",
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
  },
});
