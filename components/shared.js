import Constants from 'expo-constants'
import { Dimensions } from 'react-native'

const height = Constants.statusBarHeight

export const StatusBarHeight = height + 10
export const ScreenWidth = Dimensions.get('screen').width
export const ScreenHeight = Dimensions.get('screen').height

