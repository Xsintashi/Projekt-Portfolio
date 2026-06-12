import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';

export default function NewProjectScreen() {
  const router = useRouter();
  const { addProject } = useProjects();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [year, setYear] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 3) e.name = 'Min. 3 znaki';
    if (description.trim().length < 10) e.description = 'Min. 10 znaków';
    
    const techs = technologies.split(',').map(t => t.trim()).filter(Boolean);
    if (techs.length === 0) e.technologies = 'Podaj min. 1 technologię';
    
    const y = parseInt(year, 10);
    if (isNaN(y) || y < 2000 || y > 2030) e.year = 'Rok 2000-2030';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      addProject({
        name: name.trim(),
        description: description.trim(),
        technologies: technologies.split(',').map(t => t.trim()).filter(Boolean),
        year: parseInt(year, 10),
      });
      Alert.alert('Sukces', 'Projekt dodany!');
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Nowy projekt</Text>

          <Text style={styles.label}>Nazwa projektu</Text>
          <TextInput 
            style={[styles.input, errors.name && styles.inputError]} 
            value={name} onChangeText={setName} placeholder="Np. Kalkulator"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Opis</Text>
          <TextInput 
            style={[styles.input, styles.textArea, errors.description && styles.inputError]} 
            value={description} onChangeText={setDescription} multiline
            placeholder="Opis funkcjonalności..."
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

          <Text style={styles.label}>Technologie (po przecinku)</Text>
          <TextInput 
            style={[styles.input, errors.technologies && styles.inputError]} 
            value={technologies} onChangeText={setTechnologies} placeholder="React Native, Expo"
          />
          {errors.technologies && <Text style={styles.errorText}>{errors.technologies}</Text>}

          <Text style={styles.label}>Rok realizacji</Text>
          <TextInput 
            style={[styles.input, errors.year && styles.inputError]} 
            value={year} onChangeText={setYear} keyboardType="numeric" placeholder="2025"
          />
          {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Zapisz projekt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.buttonText}>Anuluj</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f8' },
  scrollContent: { padding: 20 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#374151' },
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: '#ef4444' },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  buttonRow: { flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' },
  saveButton: { backgroundColor: '#10b981', flex: 1, marginRight: 10, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  cancelButton: { backgroundColor: '#64748b', flex: 1, marginLeft: 10, paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});
