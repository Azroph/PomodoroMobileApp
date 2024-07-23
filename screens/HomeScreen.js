import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PomodoroTimer from '../components/PomodoroTimer';
import { loadSettings, loadStats, saveStats } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [stats, setStats] = useState({ completedSessions: 0, totalWorkTime: 0 });
  const [key, setKey] = useState(0); // Add this line

  const loadInitialData = useCallback(async () => {
    const settings = await loadSettings();
    setWorkTime(settings.workTime * 60);
    setBreakTime(settings.breakTime * 60);
    const loadedStats = await loadStats();
    setStats(loadedStats);
    setKey(prevKey => prevKey + 1); // Add this line
  }, []);

  useEffect(() => {
    loadInitialData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadInitialData();
    }, [loadInitialData])
  );

  const handleSessionComplete = () => {
    const newStats = {
      completedSessions: stats.completedSessions + 1,
      totalWorkTime: stats.totalWorkTime + workTime,
    };
    setStats(newStats);
    saveStats(newStats);
  };

  return (
    <View style={styles.container}>
      <PomodoroTimer
        key={key} // Add this line
        workTime={workTime}
        breakTime={breakTime}
        onSessionComplete={handleSessionComplete}
      />
      <Text style={styles.statsText}>Completed Sessions: {stats.completedSessions}</Text>
      <Text style={styles.statsText}>Total Work Time: {Math.floor(stats.totalWorkTime / 60)} minutes</Text>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
    },
    statsText: {
      fontSize: 16,
      marginTop: 10,
    },
    settingsButton: {
      marginTop: 20,
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
    },
    settingsButtonText: {
      color: 'white',
      fontSize: 16,
    },
  });
  