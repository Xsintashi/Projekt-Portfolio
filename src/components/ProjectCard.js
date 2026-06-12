import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProjectCard = ({ project, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.description} numberOfLines={2}>{project.description}</Text>
      <Text style={styles.techTitle}>Technologie:</Text>
      <Text style={styles.technologies}>{project.technologies}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  techTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
  },
  technologies: {
    fontSize: 14,
    color: '#0056b3',
    marginTop: 2,
  }
});

export default ProjectCard;
