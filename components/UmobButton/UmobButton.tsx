/**
 * @format
 * @flow strict-local
 */
import React, { FC, useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export interface ButtonProps {
  disabled: boolean;
  onPressButton: any;
  text: string;
  customWidth?: number;
  type?: 'fill' | 'outline' | 'clear';
  customStyle?: any;
  customTextStyle?: any;
  contentColor?: string;
}
const UmobButton: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    customStyle,
    customTextStyle,
    type = 'fill',
    disabled,
    onPressButton,
    text,
    customWidth = 279,
    contentColor = '#DAFC5A',
  } = props;
  const [debounce, setDebounce] = useState(false);
  let backgroundColor;
  let borderColor;
  let borderWidth;
  let textColor;
  switch (type) {
    case 'fill':
      backgroundColor = disabled ? '#E0E0E0' : '#0493FA';
      textColor = '#FFFFFF';
      break;
    case 'clear':
      backgroundColor = disabled ? '#E0E0E0' : 'transparent';
      textColor = '#027580';
      break;
    case 'outline':
      backgroundColor = 'transparent';
      borderColor = disabled ? '#EEEEEE' : contentColor;
      borderWidth = 2;
      textColor = disabled ? '#EEEEEE' : contentColor;
      break;
    default:
      break;
  }

  useEffect(() => {
    let interval;
    if (debounce === true) {
      interval = setTimeout(() => {
        console.log('debounce 5sec');
        setDebounce(false);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [debounce]);

  return (
    <TouchableOpacity
      style={[
        {
          width: customWidth,
        },
        styles.container,
        {
          backgroundColor,
          borderColor,
          borderWidth,
        },
        customStyle,
      ]}
      disabled={disabled}
      onPress={() => {
        if (!debounce) {
          onPressButton();
          setDebounce(true);
        }
      }}>
      <Text
        style={[
          styles.contentTextStyle,
          {
            color: textColor,
          },
          customTextStyle,
          {
            paddingHorizontal:  15,
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default UmobButton;
