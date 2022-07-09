import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import { Feather } from '@expo/vector-icons'; 

export default function WeatherInfo({ weatherData, weatherText }) {
  const date = moment();
  return (
    <>
      <View style={{ marginLeft: 15 }}>
        <View style={{
          flexDirection:'row'
        }}>
          <Feather name="map-pin" size={18} color={weatherText} style={{
             marginTop: 30,
          }} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 25,
            marginLeft: 10,
            color: weatherText,
          }}
        >
          {weatherData.name}, {weatherData.sys.country}
        </Text>
        </View>
      
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            marginTop: 15,
            color: weatherText,
          }}
        >
          {date.format("dddd — Do MMMM ")}
        </Text>
        <Text
          style={{
            fontSize: 200,
            fontWeight: "bold",
            marginTop: 30,
            alignSelf: "center",
            color: weatherText,
          }}
        >
          {Math.floor(weatherData.main.temp - 273.15)}°
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: weatherText,
            }}
          >
            {weatherData.weather[0].description}.
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              marginRight: 15,
              color: weatherText,
            }}
          >
            {Math.floor(weatherData.main.temp_max - 273.15)}°—
            {Math.floor(weatherData.main.temp_min - 273.15)}°
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 35,
              color: weatherText,
            }}
          >
            Wind: {weatherData.wind.speed} km/h
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: 35,
              marginRight: 15,
              color: weatherText,
            }}
          >
            Humidity: {weatherData.main.humidity}%
          </Text>
        </View>
      </View>
    </>
  );
}
