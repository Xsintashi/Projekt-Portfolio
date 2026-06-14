import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ProjectsProvider } from '../context/ProjectsContext';
import { ProfileProvider } from '../context/ProfileContext';

export default function RootLayout() {
  return (
    <ProjectsProvider>
      <ProfileProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#4f46e5',
            tabBarInactiveTintColor: '#64748b',
            headerShown: false,
            tabBarStyle: { backgroundColor: '#ffffff', borderTopColor: '#f1f5f9' }
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Profil',
              headerShown: true,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="projects"
            options={{
              title: 'Projekty',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="code-slash" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="contact"
            options={{
              title: 'Kontakt',
              headerShown: true,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="mail" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </ProfileProvider>
    </ProjectsProvider>
  );
}
