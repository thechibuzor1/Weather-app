import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import WeatherInfo from "./Components/WeatherInfo";
import { Divider } from "react-native-elements";

export default function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [weatherTemp, setWeatherTemp] = useState("white");
  const [weatherText, setWeatherText] = useState("black");
  const API_KEY = "953d96475850d5c8ca85133b7cfc9cd9";
  const getWeather = (city) => {
    if (!city.trim()) {
      alert("Enter the name of a city");
    } else {
      const weather_url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      return fetch(weather_url)
        .then((res) => res.json())
        .then((json) => {
          if (json.cod === "404") {
            alert("City not found");
          } else {
            setWeatherData(json);
          }
        })
        .then(() => setCityName(""))
        .catch((err) => alert(err));
    }
  };

  const setWeatherTempColor = () => {
    if (weatherData.length !== 0) {
      if (Math.floor(weatherData.main.temp - 273.15) > 29) {
        setWeatherTemp("red");
        setWeatherText("black");
      } else if (
        Math.floor(weatherData.main.temp - 273.15) > 2 &&
        Math.floor(weatherData.main.temp - 273.15) < 25
      ) {
        setWeatherTemp("black");
        setWeatherText("white");
      } else if (
        Math.floor(weatherData.main.temp - 273.15) > 24 &&
        Math.floor(weatherData.main.temp - 273.15) < 30
      ) {
        setWeatherTemp("orange");
        setWeatherText("black");
      } else {
        setWeatherTemp("white");
        setWeatherText("black");
      }
    }
  };
  useEffect(() => {
    setWeatherTempColor();
  }, [weatherData]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      backgroundColor: weatherTemp,
    },
    button: {
      backgroundColor: weatherTemp,
      width: "95%",
      marginBottom: 10,
      marginTop: 20,
      height: 48,
      borderRadius: 10,
      alignSelf: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: weatherText,
    },
    buttonTitle: {
      color: weatherText,
      fontSize: 16,
      fontWeight: "bold",
      alignSelf: "center",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <TextInput
          style={{
            color: weatherText,
            marginTop: 60,
            height: 40,
            borderColor: weatherText,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            width: "95%",

            alignSelf: "center",
          }}
          placeholder="Enter a city name"
          placeholderTextColor={weatherText}
          onChangeText={(txt) => setCityName(txt)}
          value={cityName}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            getWeather(cityName);
          }}
        >
          <Text style={styles.buttonTitle}>Search</Text>
        </TouchableOpacity>
      </View>
      <Divider width={3} color={weatherText} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {weatherData.length === 0 ? (
          <Text
            style={{
              alignSelf: "center",
              fontSize: 15,
              fontWeight: "500",
              marginTop: 15,
            }}
          >
            Search for a city to get the weather
          </Text>
        ) : (
          <WeatherInfo weatherData={weatherData} weatherText={weatherText} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
