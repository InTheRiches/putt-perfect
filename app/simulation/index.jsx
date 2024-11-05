import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { Checkbox } from "@/components/Checkbox";
import { useColorScheme } from '@/hooks/useColorScheme';
import {useLocalSearchParams, useNavigation} from 'expo-router';
import {Image, Pressable, Text} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import {SvgLogo, SvgMenu, SvgWarning} from '../../assets/svg/SvgComponents';
import { View } from 'react-native';
import {useEffect, useState} from 'react';
import Svg, { Path } from 'react-native-svg';
import {DangerButton} from "../../components/DangerButton";
import ArrowComponent from "../../components/icons/ArrowComponent";
import React from "react";

// TODO add an extreme mode with like left right left breaks
const breaks = [
  "Left to Right",
  "Right to Left",
  "Neutral",
]

const slopes = [
  "Downhill",
  "Neutral",
  "Uphill"
]

function generateBreak() {
  // Generate a random break
  return [Math.floor(Math.random() * breaks.length), Math.floor(Math.random() * slopes.length)];
}

function generateDistance(difficulty) {
  // Generate a random distance
  return Math.floor(Math.random() * (difficulty == "Easy" ? 6 : difficulty == "Medium" ? 12 : 20)) + 3;
} 

const initialState = {
  confirmLeave: false,
  canLeave: false,
  width: 0,
  height: 0,
  center: false,
  point: {},
  hole: 1,
  distance: 0,
  puttBreak: generateBreak(),
  missRead: false,
  putts: []
}

export default function Simulation() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const { localHoles, difficulty, mode } = useLocalSearchParams();
  const holes = parseInt(localHoles);

  const [
    { confirmLeave, canLeave, width, height, center, point, hole, puttBreak, distance, missRead, putts },
    setState
  ] = useState(initialState);

  const updateField = (field, value) => {
    setState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const resetState = () => {
    setState(initialState);
  }

  useEffect(() => {
    updateField("distance", generateDistance(difficulty));
  });

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (confirmLeave || distance === initialState.distance) {
        resetState();
        return;
      }

      console.log("blocked");

      // Prevent default behavior of leaving the screen (if needed)
      e.preventDefault();

      updateField("confirmLeave", true);
    })
  }, [navigation]);

  const nextHole = () => {
    if (hole == holes || point.x === undefined) {
      // todo end simulation
      return;
    }

    // TODO add a singular button at the bottom for if you miss > 5ft
    // find the distance to center of the point in x and y
    const distanceX = width / 2 - point.x;
    const distanceY = height / 2 - point.y;
    const distanceMissed = center ? 0 : Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

    const puttsCopy = [...putts];
    puttsCopy[hole - 1] = { distance: distance, break: puttBreak, missed: missRead, distanceMissed: distanceMissed, point: point };
    updateField("putts", puttsCopy);

    if (putts[hole] == undefined) {
      updateField("point", {});
      updateField("missRead", false);
      updateField("center", false);

      // generate new data
      updateField("puttBreak",generateBreak());
      updateField("distance",generateDistance(difficulty));
      updateField("hole",hole + 1);
      return;
    }

    const nextPutt = puttsCopy[hole];
    updateField("point",nextPutt.point);
    updateField("missRead",nextPutt.missed);
    updateField("center",nextPutt.distanceMissed === 0);

    updateField("puttBreak",nextPutt.break);
    updateField("hole",hole + 1);
    updateField("distance",nextPutt.distance);
  }

  const lastHole = () => {
    if (hole === 1) {
      return
    }

    // TODO add a singular button at the bottom for if you miss > 5ft
    // find the distance to center of the point in x and y
    const distanceX = width / 2 - point.x;
    const distanceY = height / 2 - point.y;
    const distanceMissed = center ? 0 : Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

    const puttsCopy = [...putts];
    puttsCopy[hole - 1] = { distance: distance, break: puttBreak, missed: missRead, distanceMissed: distanceMissed, point: point };
    updateField("putts",puttsCopy);

    const lastPutt = puttsCopy[hole - 2];
    updateField("point",lastPutt.point);
    updateField("missRead",lastPutt.missed);
    updateField("center",lastPutt.distanceMissed === 0);

    updateField("puttBreak",lastPutt.break);
    updateField("hole",hole - 1);
    updateField("distance",lastPutt.distance);
  }

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;

    updateField("width",width);
    updateField("height",height);
  };

  const singleTap = Gesture.Tap()
    .onStart((data) => {
      runOnJS(updateField)("center", data.x > width / 2 - 25 && data.x < width / 2 + 25 && data.y > height / 2 - 25 && data.y < height / 2 + 25);

      const boxWidth = width / 10;
      const boxHeight = height / 10;

      // Assuming tap data comes in as `data.x` and `data.y`
      const snappedX = Math.round(data.x / boxWidth) * boxWidth;
      const snappedY = Math.round(data.y / boxHeight) * boxHeight;

      runOnJS(updateField)("point", { x: snappedX, y: snappedY });
    });

  const fullReset = () => {
    console.log(confirmLeave);

    navigation.goBack();
  }

  return (
    <ThemedView className="flex-1 items-center flex-col pt-12 overflow-hidden">
      <ThemedView style={{ borderColor: Colors[colorScheme ?? 'light'].border }} className={"flex-row mb-4 items-center justify-between w-full border-b-[1px] pb-2 px-6"}>
        <SvgLogo></SvgLogo>
        <SvgMenu></SvgMenu>
      </ThemedView>
      <ThemedView className={"px-6"} style={{ width: "100%" }}>
        <ThemedView className="flex-col mb-4">
          <ThemedText className="mb-3" type="title">Hole {hole}</ThemedText>
          <View style={{ backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary, borderRadius: 15, borderWidth: 1, borderColor: Colors[colorScheme ?? "light"].border, paddingVertical: 12 }}>
            <View style={{ borderBottomWidth: 1, borderColor: Colors[colorScheme ?? "light"].border, paddingHorizontal: 18, paddingBottom: 8, gap: 2 }}>
              <ThemedText type="subtitle" secondary={true} style={{ fontWeight: "normal" }}>Break</ThemedText>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <ThemedText style={{ width: "75%" }} type="header">{breaks[puttBreak[0]] + " " + slopes[puttBreak[1]]}</ThemedText>
                <ArrowComponent horizontalBreak={puttBreak[0]} verticalSlope={puttBreak[1]} colorScheme={colorScheme}></ArrowComponent>
              </View>
            </View>
            <View style={{ paddingHorizontal: 18, paddingTop: 8, gap: 4 }}>
              <ThemedText type="subtitle" secondary={true} style={{ fontWeight: "normal" }}>Distance</ThemedText>
              <ThemedText type="header">{distance}ft</ThemedText>
            </View>
          </View>
          <View>
            <ThemedText type="title" style={{ marginTop: 18 }}>Result</ThemedText>
            <ThemedText type="subtitle" secondary={true} style={{ fontWeight: "normal" }}>Click on the grid where your putt went.</ThemedText>
            <View style={{ flexDirection: "row", marginTop: 8, marginBottom: 10 }}>
              <Checkbox checked={missRead} setChecked={(e) => updateField("missRead", e)}></Checkbox>
              <ThemedText type="subtitle" style={{ marginLeft: 12 }}>Miss-read?</ThemedText>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%"}}>
              <ThemedText type="defaultSemiBold" lightColor="#3f9a59" darkColor="#48D058">5 ft</ThemedText>
              <ThemedText type="defaultSemiBold" lightColor="#3f9a59" darkColor="#48D058">3 ft</ThemedText>
              <ThemedText type="defaultSemiBold" lightColor="#3f9a59" darkColor="#48D058">1 ft</ThemedText>
              <ThemedText type="defaultSemiBold" lightColor="#3f9a59" darkColor="#48D058">1 ft</ThemedText>
              <ThemedText type="defaultSemiBold" lightColor="#3f9a59" darkColor="#48D058">3 ft</ThemedText>
              <ThemedText type="defaultSemiBold" lightColor="#3f9a59" darkColor="#48D058">5 ft</ThemedText>
            </View>
            <GestureDetector gesture={singleTap}>
              <View onLayout={onLayout} style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
                <Image source={colorScheme === 'dark' ? require('../../assets/images/putting-grid.png') : require('../../assets/images/putting-grid-light.png')} style={{ borderWidth: 1, borderRadius: 12, borderColor: colorScheme == "dark" ? "#3B6948" : "transparent", width: "100%", aspectRatio: "1", height: undefined  }}/>
                <View style={{ justifyContent: "center", alignItems: "center", position: "absolute", left: width/2 - (width/20), top: height/2- (width/20), width: width/10 + 1, height: width/10 + 1, borderRadius: 24, backgroundColor: center ? "#3EC264" : "#fff" }}>
                  {center ? (
                    <Svg width={24} height={24} stroke="#157530" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                      <Path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </Svg>
                    ) : (
                      <Svg width={24} height={24} stroke="#D9D9D9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                        <Path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </Svg>
                      )}
                </View>
                {point.x !== undefined && center !== true ? (
                  <Image source={require('../../assets/images/golf-ball.png')} style={{ position: "absolute", left: point.x - 12, top: point.y - 12, width: 24, height: 24, borderRadius: 12, backgroundColor: "#fff" }}></Image>
                ) : null}
              </View>
            </GestureDetector>
            <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 14 }}>
              <ThemedButton title="Back" disabled={hole === 1} onPress={() => lastHole()}></ThemedButton>
              <DangerButton title={"Miss > 5ft?"}></DangerButton>
              <ThemedButton title="Next" disabled={hole == holes || point.x === undefined} onPress={() => nextHole()}></ThemedButton>
            </View>
          </View>
        </ThemedView>
      </ThemedView>
      {confirmLeave && <View className="absolute inset-0 flex items-center justify-center z-50 h-screen w-full" style={{ backgroundColor: colorScheme == 'light' ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.8)" }}>
        <Confirmation cancel={() => updateField("confirmLeave",false)} end={fullReset} ></Confirmation>
      </View>}
    </ThemedView>
  );
}

// TODO MAKE THIS UPLOAD A PARTIAL ROUND
function Confirmation({ end, partial, cancel }) {
    const colorScheme = useColorScheme();

    return (
        <ThemedView style={{ borderColor: colorScheme == 'light' ? "white" : Colors['dark'].border, borderWidth: 1, width: "auto", maxWidth: "70%", maxHeight: "70%", borderRadius: 16, paddingTop: 20, paddingBottom: 20, paddingHorizontal: 20, flexDirection: "col" }}>
            <View style={{ justifyContent: "center", flexDirection: "row", width: "100%" }}>
                <View style={{ padding: 12, alignContent: "center", flexDirection: "row", justifyContent: "center", borderRadius: 50, backgroundColor: Colors[colorScheme ?? "light"].buttonDangerDisabledBackground}}>
                    <SvgWarning width={26} height={26} stroke={Colors[colorScheme ?? "light"].buttonDangerBackground}></SvgWarning>
                </View>
            </View>
            <ThemedText type={"header"} style={{ fontWeight: 500, textAlign: "center", marginTop: 10 }}>End Session</ThemedText>
            <ThemedText type={"default"} secondary={true} style={{ textAlign: "center", lineHeight: 18, marginTop: 10 }}>Are you sure you want to end this session? You can always upload the partial round, otherwise all data will be lost. This action cannot be undone.</ThemedText>
            <Pressable onPress={end} style={{ backgroundColor: Colors[colorScheme ?? "light"].buttonDangerBackground, paddingVertical: 10, borderRadius: 10, marginTop: 16 }}>
                <Text style={{ textAlign: "center", color: Colors[colorScheme ?? "light"].buttonDangerText, fontWeight: 500 }}>End Session</Text>
            </Pressable>
            <Pressable onPress={partial} style={{ backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary, paddingVertical: 10, borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: Colors[colorScheme ?? "light"].border }}>
                <Text style={{ textAlign: "center", color: Colors[colorScheme ?? "light"].text, fontWeight: 500 }}>Upload as Partial</Text>
            </Pressable>
            <Pressable onPress={cancel} style={{ backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary, paddingVertical: 10, borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: Colors[colorScheme ?? "light"].border }}>
                <Text style={{ textAlign: "center", color: Colors[colorScheme ?? "light"].text, fontWeight: 500 }}>Cancel</Text>
            </Pressable>
        </ThemedView>
    )
}