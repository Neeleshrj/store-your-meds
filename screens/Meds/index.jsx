import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useIsFocused } from "@react-navigation/native";

//hooks
import useAuth from "../../hooks/useAuth";

//components
import Typography from "../../components/Typography";

import { Ionicons } from "@expo/vector-icons";

export default function Meds({ navigation }) {
  const { logout, dbId, token, databases, Query } = useAuth();
  const [medlist, setMedlist] = useState(null);
  const [selectDiseaseId, setSelectedDiseaseId] = useState(null);
    const isFocused = useIsFocused();

  const getMeds = () => {
    databases
      .listDocuments(dbId, "meds", [Query.equal("user_id", token)])
      .then((res) => {
        setMedlist(res.documents);
      })
      .catch((e) => console.log(e));
  };

  const deleteMeds = (id) => {
    Alert.alert("Are you sure you want to delete this item?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          databases
            .deleteDocument(dbId, "meds", id)
            .then((res) => {
              getMeds();
            })
            .catch((e) => console.log(e));
        },
      },
    ]);
  };

  useEffect(() => {
    getMeds();
  }, [isFocused]);

  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => setSelectedDiseaseId(null)}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#0076FF",
          paddingTop: "20%",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "4%",
            paddingHorizontal: "4%",
          }}
        >
          <Typography textSize="h3" textColor="white1" textWeight="bold">
            Medicine List
          </Typography>
          <TouchableOpacity onPress={() => logout()}>
            <Ionicons name="log-out-outline" color="#fff" size={hp(2.5)} />
          </TouchableOpacity>
        </View>
      </View>

      {!medlist || medlist.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
          <Typography textSize="h3">Nothing to show here!</Typography>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            marginTop: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {medlist.map((obj) => (
            <TouchableOpacity
              key={obj.$id}
              onPress={() => setSelectedDiseaseId(obj.$id)}
              style={styles.listContainerRoot}
              activeOpacity={1}
            >
              <View style={styles.listContainer}>
                <Typography textColor="black1" textSize="h3">
                  {obj.disease_name}
                </Typography>
                <TouchableOpacity onPress={() => deleteMeds(obj.$id)}>
                  <Ionicons name="trash-outline" size={hp(3)} color="#DD3730" />
                </TouchableOpacity>
              </View>
              {obj.$id === selectDiseaseId && (
                <View style={{ marginVertical: '4%' }}>
                  {obj.med_list.map((item) => (
                    <Typography textSize="h4" key={item.$id}>○ {item}</Typography>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.floatingButtonContainerStyle}
        onPress={() => navigation.navigate("Add")}
      >
        <Ionicons name="add-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  floatingButtonContainerStyle: {
    position: "absolute",
    backgroundColor: "#0076FF",
    borderRadius: 100,
    height: hp(8),
    width: hp(8),
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainerRoot: {
    backgroundColor: "#f0f0f0",
    marginVertical: "2.5%",
    borderColor: "#000",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: wp(85),
    padding: "5%",
    borderRadius: 16,
  },
  listContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
});
