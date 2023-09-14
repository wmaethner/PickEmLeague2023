import Constants from 'expo-constants';
import { Platform } from "react-native";
import { VersionSchema } from '../apis';

export const versionUpdateAvailable = (versions: VersionSchema): boolean => {
  switch (Platform.OS) {
    case 'ios':
      return versions.ios > Number(Constants.expoConfig.ios?.buildNumber);
    case 'android':
      return versions.android > Constants.expoConfig.android.versionCode;
  }
  return false;
}