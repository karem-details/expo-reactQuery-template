import { Colors } from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import React, { PropsWithChildren } from 'react';
import { Platform, StyleProp, Text, TextStyle } from 'react-native';

export interface IPrimaryTextProps extends PropsWithChildren {
  color?: string;
  fontSize?: number;
  fontFamily?: keyof typeof Fonts;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  text: string;
  textAlign?: 'left' | 'right' | 'center';
}

const PrimaryText: React.FC<IPrimaryTextProps> = ({
  color,
  fontFamily,
  fontSize,
  style,
  numberOfLines,
  text,
  children,
  textAlign,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: fontFamily ? Fonts[fontFamily] : Fonts.Regular,
          marginBottom: Platform.OS === 'android' ? 1 : 0,
          fontSize,
          color: color || Colors.text,
          textAlign: textAlign || 'left',
        },
        style,
      ]}
    >
      {text}
      {children}
    </Text>
  );
};

export default React.memo(PrimaryText);
