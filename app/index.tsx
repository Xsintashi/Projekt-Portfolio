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

  const handleStartEdit = () => {
    setName(profile.name);
    setBio(profile.bio);
    setSkills(profile.skills.join(', '));
    setErrors({});
    setEditing(true);
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
        <TouchableOpacity style={styles.editButton} onPress={handleStartEdit}>
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
  container: { padding: 20, backgroundColor: '#f8fafc', flexGrow: 1 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16, alignSelf: 'center', borderWidth: 3, borderColor: '#e2e8f0' },
  name: { fontSize: 26, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  editButton: { backgroundColor: '#4f46e5', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, shadowColor: '#4f46e5', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  editButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  section: { marginBottom: 25, backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 2, shadowColor: '#0f172a', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 2 } },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1e293b', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 6 },
  description: { fontSize: 15, lineHeight: 24, color: '#334155' },
  skillsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  skillBadge: { backgroundColor: '#e0e7ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8, marginBottom: 8 },
  skillText: { color: '#4338ca', fontWeight: '600', fontSize: 13 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#475569' },
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#0f172a' },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: '#ef4444' },
  errorText: { color: '#ef4444', fontSize: 12, marginTop: 4 },
  buttonRow: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' },
  saveButton: { backgroundColor: '#10b981', flex: 1, marginRight: 10, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  cancelButton: { backgroundColor: '#64748b', flex: 1, marginLeft: 10, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
