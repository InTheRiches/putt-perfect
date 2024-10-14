import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Checkbox } from "@/components/Checkbox";
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import {SvgArrow, SvgLogo, SvgMenu} from '../../assets/svg/SvgComponents';
import { View } from 'react-native';
import { useState } from 'react';
import Svg, { Path } from 'react-native-svg';

const breaks = [
  "Left -> Right",
  "Right -> Left",
  "Neutral",
]

const slopes = [
  "Downhill",
  "Neutral",
  "Uphill"
]

function generateBreak() {
  // Generate a random break
  return breaks[Math.floor(Math.random() * breaks.length)] + " " + slopes[Math.floor(Math.random() * slopes.length)];
}

function generateDistance(difficulty) {
  // Generate a random distance
  return Math.floor(Math.random() * (difficulty == "Easy" ? 6 : difficulty == "Medium" ? 12 : 20)) + 3;
} 

export default function Simulation() {
  const colorScheme = useColorScheme();

  const { holes, difficulty, mode } = useLocalSearchParams();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  
  const [center, setCenter] = useState(false);
  const [point, setPoint] = useState({});

  const [hole, setHole] = useState(1);
  const [puttBreak, setPuttBreak] = useState(generateBreak());
  const [distance, setDistance] = useState(generateDistance(difficulty))

  const [putts, setPutts] = useState([]);
  
  const switchHoles = () => {
    if (hole == holes) {
      // end simulation
    }

    // find the distance to center of the point in x and y
    // TODO add a singular button at the bottom for if you miss > 5ft
    const distanceX = width / 2 - point.x;
    const distanceY = height / 2 - point.y;
    const distanceMissed = center ? 0 : Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));
    setPutts([...putts, { x: point.x, y: point.y, distanceMissed: distanceMissed, distance: distance, break: puttBreak }])

    setPuttBreak(generateBreak());
    setHole(hole + 1);
    setDistance(generateDistance(difficulty));
  }

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;

    setWidth(width);
    setHeight(height);
  };

  const singleTap = Gesture.Tap()
    .onStart((data) => {
      runOnJS(setCenter)(data.x > width / 2 - 25 && data.x < width / 2 + 25 && data.y > height / 2 - 25 && data.y < height / 2 + 25);

      runOnJS(setPoint)({ x: data.x, y: data.y });
    });

  return (
    <ThemedView className="flex-1 items-center flex-col pt-12 overflow-hidden">
      <ThemedView style={{ borderColor: Colors[colorScheme ?? 'light'].border }} className={"flex-row mb-6 items-center justify-between w-full border-b-[1px] pb-4 px-6"}>
        <SvgLogo></SvgLogo>
        <SvgMenu></SvgMenu>
      </ThemedView>
      <ThemedView className={"px-6"} style={{ width: "100%" }}>
        <ThemedView className="flex-col mb-4">
          <ThemedText className="mb-4" type="title">Hole {hole}</ThemedText>
          <View style={{ backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary, borderRadius: 15, borderWidth: 1, borderColor: Colors[colorScheme ?? "light"].border, paddingVertical: 12 }}>
            <View style={{ borderBottomWidth: 1, borderColor: Colors[colorScheme ?? "light"].border, paddingHorizontal: 18, paddingBottom: 12, gap: 6 }}>
              <ThemedText type="subtitle" secondary={true} style={{ fontWeight: "normal" }}>Break</ThemedText>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <ThemedText style={{ width: "75%" }} type="header">{puttBreak}</ThemedText>
                <SvgArrow width="33" height="33" stroke={Colors[colorScheme ?? "light"].text}></SvgArrow>
              </View>
            </View>
            <View style={{ paddingHorizontal: 18, paddingTop: 12, gap: 6 }}>
              <ThemedText type="subtitle" secondary={true} style={{ fontWeight: "normal" }}>Distance</ThemedText>
              <ThemedText type="header">{distance}ft</ThemedText>
            </View>
          </View>
          <View>
            <ThemedText type="title" style={{ marginTop: 18 }}>Result</ThemedText>
            <ThemedText type="subtitle" secondary={true} style={{ fontWeight: "normal", marginTop: 2 }}>Click on the grid where your putt went.</ThemedText>
            <View style={{ flexDirection: "row", marginTop: 12, marginBottom: 16 }}>
              <Checkbox></Checkbox>
              <ThemedText type="header" style={{ marginLeft: 12 }}>Miss-read?</ThemedText>
            </View>
            <GestureDetector gesture={singleTap}>
              <View onLayout={onLayout}>
                <Image source={colorScheme == 'dark' ? require('../../assets/images/putting-grid.png') : require('../../assets/images/putting-grid-light.png')}  style={{ borderWidth: 1, borderRadius: 12, borderColor: colorScheme == "dark" ? "#3B6948" : "transparent", width: "100%", aspectRatio: "1", height: undefined  }}/>
                <View style={{ justifyContent: "center", alignItems: "center", position: "absolute", left: width/2 - (width/17), top: height/2- (width/17), width: width/8.5 + 1, height: width/8.5 + 1, borderRadius: 24, backgroundColor: center ? "#3EC264" : "#fff" }}>
                  {center ? (
                    <Svg width={32} height={32} stroke="#157530" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                      <Path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </Svg>
                    ) : null}
                </View>
                {point.x != undefined && center != true ? (
                  <View style={{ position: "absolute", left: point.x - 6, top: point.y - 6, width: 24, height: 24, borderRadius: 12, backgroundColor: "#fff" }}></View>
                ) : null}
              </View>
            </GestureDetector>
            <View>
              <ThemedButton title="Back" disabled={hole == 1}></ThemedButton>
              <ThemedButton title="Next" disabled={hole == holes || point.x == undefined}></ThemedButton>
            </View>
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}