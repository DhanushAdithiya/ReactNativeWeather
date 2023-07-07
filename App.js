import React, { cloneElement, useEffect, useState } from "react";
import { Pressable } from "react-native";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
  TextInput,
  Button,
  Dimensions,
  Modal,
} from "react-native";

console.log("test2");

function Search({ showSearchCity, setCity, fetchCity, searchCity }) {
  return (
    <SafeAreaView style={style.AndroidSafeArea}>
      <Modal visible={showSearchCity} animationType="slide">
        <SafeAreaView style={style.modal}>
          <TextInput
            placeholder="Search"
            onChangeText={(val) => setCity(val)}
          />
          <Button onPress={() => fetchCity()} title="Search" color="#841584" />
        </SafeAreaView>
      </Modal>

      <View style={style.searchContainer}>
        <Button onPress={searchCity} title="Search City" color="#841584" />
      </View>
    </SafeAreaView>
  );
}

const App = () => {
  const [apiData, setApiData] = useState(null);
  const [showSearchCity, setShowSearchCity] = useState(false);
  const [city, setCity] = useState("bangalore");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(loc) {
    loc = city;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${process.env.REACT_APP_API_KEY}`
      );

      const data = await res.json();
      setApiData(data);
    } catch (err) {
      console.log(err);
    }
  }

  const searchCity = () => {
    console.log("clicked");
    setShowSearchCity(true);
  };

  const fetchCity = () => {
    setShowSearchCity(false);
    fetchData(city);
  };

  const { height, width } = Dimensions.get("window");
  const currentDate = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  if (apiData.cod === 200) {
    return (
      <SafeAreaView style={style.AndroidSafeArea}>
        {/* {showSearchCity && (
          <SafeAreaView style={style.AndroidSafeArea}>
            <Modal visible={showSearchCity} animationType="slide">
              <SafeAreaView style={style.modal}>
                <TextInput
                  placeholder="Search"
                  onChangeText={(val) => setCity(val)}
                />
                <Button
                  onPress={() => fetchCity()}
                  title="Search"
                  color="#841584"
                />
              </SafeAreaView>
            </Modal>

            <View style={style.searchContainer}>
              <Button
                onPress={searchCity}
                title="Search City"
                color="#841584"
              />
            </View>
          </SafeAreaView>
        )} */}

        {showSearchCity && (
          <Search
            showSearchCity={showSearchCity}
            setCity={setCity}
            fetchCity={fetchCity}
            searchCity={searchCity}
          />
        )}
        <View style={style.searchContainer}>
          <Pressable onPress={() => searchCity()}>
            <Image
              style={style.search}
              source={require("./assets/icons8-search-50.png")}
            />
          </Pressable>
        </View>
        <View>
          <Text style={style.city}>{apiData.name}</Text>
        </View>
        <View style={style.container}>
          <Text style={style.date}>{formattedDate}</Text>
          <Text style={style.type}>{apiData.weather[0].main}</Text>
        </View>
        <View>
          <Text style={style.temp}>{Math.round(apiData.main.temp - 273)}</Text>
        </View>
        <View style={style.summaryContainer}>
          <Text style={style.dailySummary}>Daily Summary</Text>
          <Text style={style.summaryType}>
            {apiData.weather[0].description}
          </Text>
          <Text style={style.summaryFeel}>
            How it feels like: {Math.round(apiData.main.feels_like - 273)}°
          </Text>
          <Text style={style.summryRange}>
            The Temperate fell in the range from{" "}
            {Math.round(apiData.main.temp_max - 273)}° to{" "}
            {Math.round(apiData.main.temp_min - 273)}°
          </Text>
        </View>
        <View style={style.descContainer}>
          <View style={style.description}>
            <View>
              <Image
                style={style.image}
                source={require("./assets/icons8-wind-50.png")}
              />
              <Text style={style.descriptionText1}>
                {Math.round(apiData.wind.speed)}km/h
              </Text>
              <Text style={style.descriptionText2}>Wind</Text>
            </View>
            <View>
              <Image
                style={style.image}
                source={require("./assets/icons8-drop-50.png")}
              />
              <Text style={style.descriptionText1}>
                {Math.round(apiData.main.humidity)}%
              </Text>
              <Text style={style.descriptionText2}>Humidity</Text>
            </View>
            <View>
              <Image
                style={style.image}
                source={require("./assets/icons8-eye-24.png")}
              />
              <Text style={style.descriptionText1}>
                {apiData.visibility / 1000}km
              </Text>
              <Text style={style.descriptionText2}>Visibility</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (apiData.cod !== 200) {
    return (
      <SafeAreaView style={style.AndroidSafeArea}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 40,
            }}
          >
            Please Make sure the name of the city is correct!
          </Text>
          <Pressable onPress={() => searchCity()}>
            <Image
              style={style.search}
              source={require("./assets/icons8-search-50.png")}
            />
          </Pressable>

          {showSearchCity && (
            <Search
              showSearchCity={showSearchCity}
              setCity={setCity}
              fetchCity={fetchCity}
              searchCity={searchCity}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
};

const style = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#EDB230",
    flex: 1,
  },

  city: {
    fontWeight: "bold",
    color: "black",
    fontSize: 25,
    textAlign: "center",
  },
  container: {
    alignItems: "center",
    margin: 40,
  },
  date: {
    backgroundColor: "black",
    color: "white",
    width: 160,
    height: 30,
    textAlign: "center",
    borderRadius: 20,
    fontSize: 15,
    padding: 5,
  },
  type: {
    fontSize: 16,
    marginTop: 15,
  },
  temp: {
    fontSize: 200,
    textAlign: "center",
  },

  summaryContainer: {
    marginLeft: 30,
    marginTop: 10,
  },
  dailySummary: {
    fontWeight: "bold",
    fontSize: 20,
  },

  description: {
    // backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
    backgroundColor: "#2274A5",
    borderRadius: 15,
    height: 150,
    paddingTop: 30,
    width: 350,
  },
  descriptionText1: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  descriptionText2: {
    textAlign: "center",
    color: "white",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  descContainer: {
    alignItems: "center",
  },
  searchContainer: {
    width: "100%",
    alignItems: "center", // Center align the search image
    marginTop: 10,
    marginBottom: 15,
  },
  search: {
    width: 30,
    height: 30,
  },
  modal: {},
});

export default App;
