import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { loadSettings, saveSettings } from '../utils/storage';

export default function SettingsScreen({ navigation, route }) {
  const [workTime, setWorkTime] = useState('25');
  const [breakTime, setBreakTime] = useState('5');

  useEffect(() => {
    loadInitialSettings();
  }, []);

  const loadInitialSettings = async () => {
    const settings = await loadSettings();
    setWorkTime(settings.workTime.toString());
    setBreakTime(settings.breakTime.toString());
  };

  const handleSave = async () => {
    await saveSettings({
      workTime: parseInt(workTime),
      breakTime: parseInt(breakTime),
    });
    route.params.onSettingsChange();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Work Time (minutes):</Text>
      <TextInput
        style={styles.input}
        value={workTime}
        onChangeText={setWorkTime}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Break Time (minutes):</Text>
      <TextInput
        style={styles.input}
        value={breakTime}
        onChangeText={setBreakTime}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F0F0',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});