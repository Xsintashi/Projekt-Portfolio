import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';

export default function ProjectDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { projects } = useProjects();

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.notFound}>Nie znaleziono projektu</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Wróć do listy</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{project.name}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opis projektu</Text>
          <Text style={styles.description}>{project.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technologie</Text>
          {project.technologies.map((tech, index) => (
            <Text key={index} style={styles.techItem}>• {tech}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rok realizacji</Text>
          <Text style={styles.year}>{project.year}</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Wróć do listy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f8' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  notFound: { fontSize: 18, color: '#ef4444', marginBottom: 20 },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#1e293b' },
  section: { backgroundColor: '#ffffff', padding: 16, borderRadius: 10, marginBottom: 16, elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#334155', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 6 },
  description: { fontSize: 16, lineHeight: 24, color: '#333333' },
  techItem: { fontSize: 15, color: '#475569', marginBottom: 4 },
  year: { fontSize: 16, color: '#0ea5e9', fontWeight: 'bold' },
  backButton: { backgroundColor: '#64748b', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' }
});
