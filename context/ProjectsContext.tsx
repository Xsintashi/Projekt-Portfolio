import React, { createContext, useContext, useEffect, useState } from 'react';
import { saveData, loadData } from '../utils/storage';
import initialData from '../src/data/initialData.json';

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  year: number;
};

type Ctx = {
  projects: Project[];
  addProject: (p: Omit<Project, 'id'>) => void;
  removeProject: (id: string) => void;
};

const ProjectsContext = createContext<Ctx | null>(null);
const STORAGE_KEY = '@projects';

const initialProjects: Project[] = initialData.projects.map(p => ({
  id: p.id,
  name: p.title,
  description: p.description,
  technologies: p.technologies.split(',').map(t => t.trim()),
  year: (p as any).year || 2026
}));

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Wczytanie danych przy starcie
  useEffect(() => {
    (async () => {
      const stored = await loadData<any[]>(STORAGE_KEY);
      if (stored && stored.length > 0) {
        const normalized = stored.map(p => ({
          id: p.id,
          name: p.name || p.title || 'Brak nazwy',
          description: p.description || '',
          technologies: Array.isArray(p.technologies)
            ? p.technologies
            : (typeof p.technologies === 'string' ? p.technologies.split(',').map((t: string) => t.trim()) : []),
          year: p.year || 2026
        }));
        setProjects(normalized);
      } else {
        setProjects(initialProjects);
      }
      setLoaded(true);
    })();
  }, []);

  // Zapis przy zmianie
  useEffect(() => {
    if (loaded) saveData(STORAGE_KEY, projects);
  }, [projects, loaded]);

  const addProject = (p: Omit<Project, 'id'>) => {
    const newProject: Project = { ...p, id: Date.now().toString() };
    setProjects(prev => [newProject, ...prev]);
  };

  const removeProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, removeProject }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects musi byc uzyty w ProjectsProvider');
  return ctx;
}
