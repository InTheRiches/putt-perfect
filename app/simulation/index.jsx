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

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [center, setCenter] = useState(false);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;

    setWidth(width);
    setHeight(height);
  };

  const item = useLocalSearchParams();

  const [point, setPoint] = useState({});

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
          <ThemedText className="mb-4" type="title">Hole 1</ThemedText>
          <View style={{ backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary, borderRadius: 15, borderWidth: 1, borderColor: Colors[colorScheme ?? "light"].border, paddingVertical: 12 }}>
            <View style={{ borderBottomWidth: 1, borderColor: Colors[colorScheme ?? "light"].border, paddingHorizontal: 18, paddingBottom: 12, gap: 6 }}>
              <ThemedText type="subtitle" secondary={true} style={{ fontWeight: "normal" }}>Break</ThemedText>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <ThemedText style={{ width: "75%" }} type="header">Left - Right Downhill</ThemedText>
                <SvgArrow width="33" height="33" stroke={Colors[colorScheme ?? "light"].text}></SvgArrow>
              </View>
            </View>
            <View style={{ paddingHorizontal: 18, paddingTop: 12, gap: 6 }}>
              <ThemedText type="subtitle" secondary={true} style={{ fontWeight: "normal" }}>Distance</ThemedText>
              <ThemedText type="header">4ft</ThemedText>
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
          </View>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}