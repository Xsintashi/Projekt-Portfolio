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
          <View style={styles.techContainer}>
            {project.technologies.map((tech, index) => (
              <View key={index} style={styles.techBadge}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
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
  container: { flex: 1, backgroundColor: '#f8fafc' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  notFound: { fontSize: 18, color: '#ef4444', marginBottom: 20, fontWeight: '600' },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#0f172a' },
  section: { backgroundColor: '#ffffff', padding: 20, borderRadius: 16, marginBottom: 16, elevation: 2, shadowColor: '#0f172a', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 2 } },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#1e293b', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 6 },
  description: { fontSize: 15, lineHeight: 24, color: '#334155' },
  techContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  techBadge: { backgroundColor: '#e0e7ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 8, marginBottom: 8 },
  techText: { color: '#4338ca', fontSize: 13, fontWeight: '600' },
  year: { fontSize: 16, color: '#4f46e5', fontWeight: 'bold' },
  backButton: { backgroundColor: '#64748b', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 20, shadowColor: '#64748b', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});
