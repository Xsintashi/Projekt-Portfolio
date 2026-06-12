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
            style={[styles.button, { backgroundColor: '#3b82f6' }]} 
            onPress={() => Linking.openURL(`mailto:${email}`)}
          >
            <Text style={styles.buttonText}>Wyślij e-mail</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#333333' }]} 
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
  container: { flex: 1, backgroundColor: '#f2f4f8' },
  scrollContent: { padding: 20 },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 20 },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, shadowOffset: { width: 0, height: 2 } },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  emailText: { fontSize: 15, color: '#3b82f6', marginBottom: 16 },
  linkText: { fontSize: 15, color: '#333', marginBottom: 16 },
  button: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' }
});
