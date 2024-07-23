import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function PomodoroTimer({ workTime, breakTime, onSessionComplete }) {
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Reset timer when workTime or breakTime changes
    setTimeLeft(isWorkSession ? workTime : breakTime);
    setIsRunning(false);
  }, [workTime, breakTime]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      handleSessionEnd();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleSessionEnd = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    if (isWorkSession) {
      onSessionComplete();
    }
    setIsWorkSession(!isWorkSession);
    setTimeLeft(isWorkSession ? breakTime : workTime);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isWorkSession ? workTime : breakTime);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.sessionText}>
          {isWorkSession ? 'Work Session' : 'Break Session'}
        </Text>
      </Animated.View>
      <TouchableOpacity style={styles.button} onPress={toggleTimer}>
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={resetTimer}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    timerText: {
      fontSize: 72,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    sessionText: {
      fontSize: 24,
      marginBottom: 30,
    },
    button: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 30,
      paddingVertical: 15,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });