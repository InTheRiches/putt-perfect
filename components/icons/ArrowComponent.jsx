import React from 'react';
import { View } from 'react-native';
import {SvgArrow} from "../../assets/svg/SvgComponents";
import {Colors} from "../../constants/Colors"; // Adjust this import based on your setup

// Define mappings for horizontal break and slope
const getRotationAngle = (horizontalBreak, verticalSlope) => {
  // Mapping table
  const rotationMap = {
    // Left to Right
    '0,0': '0deg',   // Downhill
    '0,1': '45deg',   // Neutral
    '0,2': '90deg',   // Uphill

    // Right to Left
    '1,0': '270deg', // Downhill
    '1,1': '225deg',  // Neutral
    '1,2': '180deg',    // Uphill

    // Neutral
    '2,0': '-45deg', // Downhill
    '2,1': '-45deg',    // Neutral
    '2,2': '135deg',   // Uphill
  };

  return rotationMap[`${horizontalBreak},${verticalSlope}`] || '0deg';
};

const ArrowComponent = ({ horizontalBreak, verticalSlope, colorScheme }) => {
  const rotation = getRotationAngle(horizontalBreak, verticalSlope);

  return (
    <View>
      {(horizontalBreak === 2 && verticalSlope === 1) ?
        <View style={{ width: 33, height: 33, borderRadius: 50, backgroundColor: Colors[colorScheme ?? "light"].text }}></View> :
        <SvgArrow
          width="33"
          height="33"
          stroke={Colors[colorScheme ?? "light"].text}
          style={{ transform: [{ rotate: rotation }] }}
        />}
    </View>
  );
};

export default ArrowComponent;