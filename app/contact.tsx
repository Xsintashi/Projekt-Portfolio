import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function ContactScreen() {
  const email = 'jan.kowalski@student.uczelnia.pl';
  const github = 'https://github.com/xsintashi';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Kontakt</Text>

        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>E-mail</Text>
            <Text style={styles.emailText}>{email}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>GitHub</Text>
            <Text style={styles.linkText}>{github}</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#4f46e5' }]} 
            onPress={() => Linking.openURL(`mailto:${email}`)}
          >
            <Text style={styles.buttonText}>Wyślij e-mail</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#0f172a' }]} 
            onPress={() => Linking.openURL(github)}
          >
            <Text style={styles.buttonText}>Otwórz GitHub</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 20, color: '#0f172a' },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 24, elevation: 2, shadowColor: '#0f172a', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 2 } },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', trackingLetter: 1, marginBottom: 6 },
  emailText: { fontSize: 16, color: '#4f46e5', fontWeight: '600' },
  linkText: { fontSize: 16, color: '#0f172a', fontWeight: '500' },
  button: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, alignItems: 'center', marginTop: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});
