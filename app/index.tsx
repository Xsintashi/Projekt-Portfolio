import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useProfile } from '../context/ProfileContext';

export default function ProfileScreen() {
  const { profile, updateProfile } = useProfile();
  const [editing, setEditing] = useState(false);
  
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [skills, setSkills] = useState(profile.skills.join(', '));
  const [errors, setErrors] = useState<{name?: string, bio?: string, skills?: string}>({});

  const handleSave = () => {
    let valid = true;
    let newErrors: {name?: string, bio?: string, skills?: string} = {};

    if (name.trim().length < 2) {
      newErrors.name = 'Imię musi mieć min. 2 znaki.';
      valid = false;
    }
    if (bio.trim().length < 10) {
      newErrors.bio = 'Opis musi mieć min. 10 znaków.';
      valid = false;
    }
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    if (skillsArray.length < 1) {
      newErrors.skills = 'Podaj min. 1 umiejętność.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      updateProfile({
        ...profile,
        name: name.trim(),
        bio: bio.trim(),
        skills: skillsArray
      });
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setName(profile.name);
    setBio(profile.bio);
    setSkills(profile.skills.join(', '));
    setErrors({});
    setEditing(false);
  };

  if (editing) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Edytuj Profil</Text>

        <Text style={styles.label}>Imię i nazwisko</Text>
        <TextInput 
          style={[styles.input, errors.name && styles.inputError]}
          value={name} onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>O mnie</Text>
        <TextInput 
          style={[styles.input, styles.textArea, errors.bio && styles.inputError]}
          value={bio} onChangeText={setBio} multiline
        />
        {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}

        <Text style={styles.label}>Umiejętności (po przecinku)</Text>
        <TextInput 
          style={[styles.input, errors.skills && styles.inputError]}
          value={skills} onChangeText={setSkills}
        />
        {errors.skills && <Text style={styles.errorText}>{errors.skills}</Text>}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Zapisz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Anuluj</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{profile.name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
          <Text style={styles.editButtonText}>Edytuj profil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>O mnie</Text>
        <Text style={styles.description}>{profile.bio}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Umiejętności</Text>
        <View style={styles.skillsContainer}>
          {profile.skills.map((skill, index) => (
            <View key={index} style={styles.skillBadge}>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f2f4f8', flexGrow: 1 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16, alignSelf: 'center' },
  name: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  editButton: { backgroundColor: '#0056b3', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
  editButtonText: { color: '#fff', fontWeight: 'bold' },
  section: { marginBottom: 25, backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#222', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
  description: { fontSize: 16, lineHeight: 24, color: '#555' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBadge: { backgroundColor: '#e6f2ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  skillText: { color: '#0056b3', fontWeight: '500' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: '#ef4444' },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  buttonRow: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' },
  saveButton: { backgroundColor: '#10b981', flex: 1, marginRight: 10, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  cancelButton: { backgroundColor: '#9ca3af', flex: 1, marginLeft: 10, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
