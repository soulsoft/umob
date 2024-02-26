/**
 * @format
 * @flow strict-local
 */
import React, { FC } from 'react'
import * as Icon from 'iconsax-react-native'
import { View } from 'react-native'

export interface IconProps {
  name: keyof typeof Icon
  size: number
  color: string
  variant:
    | 'Linear'
    | 'Outline'
    | 'TwoTone'
    | 'Bulk'
    | 'Broken'
    | 'Bold'
  style?: object
}

const Iconsax: FC<IconProps> = (props: IconProps) => {
  const { name, size, color, style, variant = 'Linear' } = props
  const Name = Icon[name]

  return (
    <View style={style}>
      {Name ? (
        <Name variant={variant} size={size} color={color} />
      ) : null}
    </View>
  )
}
export default Iconsax
