import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';
import ProjectCard from '../../src/components/ProjectCard';

export default function ProjectsListScreen() {
  const router = useRouter();
  const { projects, removeProject } = useProjects();
  const [sortAsc, setSortAsc] = useState(false);

  const confirmDelete = (id: string, name: string) => {
    Alert.alert(
      'Usuń projekt',
      `Czy na pewno chcesz usunąć projekt "${name}"?`,
      [
        { text: 'Anuluj', style: 'cancel' },
        { text: 'Usuń', style: 'destructive', onPress: () => removeProject(id) },
      ]
    );
  };

  const sortedProjects = [...projects].sort((a, b) => {
    return sortAsc ? a.year - b.year : b.year - a.year;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Moje Projekty</Text>
        <TouchableOpacity 
          style={styles.sortButton} 
          onPress={() => setSortAsc(!sortAsc)}
        >
          <Text style={styles.sortButtonText}>
            Sortuj: {sortAsc ? 'Rok ↑' : 'Rok ↓'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedProjects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onPress={() => router.push(`/projects/${item.id}`)}
            onDelete={() => confirmDelete(item.id, item.name)}
          />
        )}
      />

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => router.push('/projects/new')}
      >
        <Text style={styles.addButtonText}>+ Dodaj projekt</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 40, marginBottom: 20 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#0f172a' },
  sortButton: { backgroundColor: '#e0e7ff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  sortButtonText: { color: '#4338ca', fontWeight: '600', fontSize: 14 },
  listContent: { paddingHorizontal: 20, paddingBottom: 80 },
  addButton: { backgroundColor: '#4f46e5', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 20, marginBottom: 16, shadowColor: '#4f46e5', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  addButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});
