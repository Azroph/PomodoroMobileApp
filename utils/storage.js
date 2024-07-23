import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSettings = async (settings) => {
  try {
    await AsyncStorage.setItem('settings', JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings');
  }
};

export const loadSettings = async () => {
  try {
    const settings = await AsyncStorage.getItem('settings');
    return settings ? JSON.parse(settings) : { workTime: 25, breakTime: 5 };
  } catch (e) {
    console.error('Failed to load settings');
    return { workTime: 25, breakTime: 5 };
  }
};

export const saveStats = async (stats) => {
  try {
    await AsyncStorage.setItem('stats', JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats');
  }
};

export const loadStats = async () => {
  try {
    const stats = await AsyncStorage.getItem('stats');
    return stats ? JSON.parse(stats) : { completedSessions: 0, totalWorkTime: 0 };
  } catch (e) {
    console.error('Failed to load stats');
    return { completedSessions: 0, totalWorkTime: 0 };
  }
};