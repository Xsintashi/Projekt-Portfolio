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
            tabBarActiveTintColor: '#0056b3',
            tabBarInactiveTintColor: '#999999',
            headerShown: false,
            tabBarStyle: { backgroundColor: '#ffffff' }
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
