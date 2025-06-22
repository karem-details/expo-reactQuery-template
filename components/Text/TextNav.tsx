import { TouchableOpacity } from 'react-native';
import PrimaryText, { IPrimaryTextProps } from './PrimaryText';
import { Colors } from '@/constants/Colors';
import React from 'react';

interface ITextNavProps extends IPrimaryTextProps {
  onPress?: () => void;
}

const TextNav: React.FC<ITextNavProps> = ({
  onPress,
  text,
  color,
  fontFamily,
  fontSize,
  style,
  numberOfLines,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <PrimaryText
        text={text}
        numberOfLines={numberOfLines}
        style={[
          { textDecorationLine: 'underline', textDecorationStyle: 'solid' },
          style,
        ]}
        color={color || Colors.text}
        fontSize={fontSize || 13}
        fontFamily={fontFamily || 'Medium'}
      />
    </TouchableOpacity>
  );
};

export default React.memo(TextNav);
