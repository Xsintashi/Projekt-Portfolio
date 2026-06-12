import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useProjects } from '../../context/ProjectsContext';

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
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => router.push(`/projects/${item.id}`)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.projectName}>{item.name}</Text>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => confirmDelete(item.id, item.name)}
              >
                <Text style={styles.deleteButtonText}>Usuń</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.projectDesc} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.projectYear}>Rok: {item.year}</Text>
          </TouchableOpacity>
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
  container: { flex: 1, backgroundColor: '#f2f4f8' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 40, marginBottom: 20 },
  header: { fontSize: 28, fontWeight: 'bold' },
  sortButton: { backgroundColor: '#e2e8f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  sortButtonText: { color: '#334155', fontWeight: '600', fontSize: 14 },
  listContent: { paddingHorizontal: 20, paddingBottom: 80 },
  card: { backgroundColor: '#ffffff', borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 1 } },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  projectName: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  deleteButton: { backgroundColor: '#ef4444', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  deleteButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  projectDesc: { fontSize: 14, color: '#666666', marginBottom: 8 },
  projectYear: { fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  addButton: { backgroundColor: '#10b981', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginHorizontal: 20, marginBottom: 16 },
  addButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' }
});
