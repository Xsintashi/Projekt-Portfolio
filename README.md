# Portfolio Studenta

Aplikacja mobilna wykonana w **React Native** (przy użyciu frameworka **Expo**), pełniąca rolę interaktywnego portfolio studenta. Projekt umożliwia zaprezentowanie własnej osoby, posiadanych umiejętności oraz dorobku w postaci zrealizowanych projektów programistycznych. 

Aplikacja została oparta na architekturze z użyciem `Context API` do zarządzania stanem oraz `AsyncStorage` do trwałego zapisywania danych.

## 🚀 Funkcjonalności

- **Ekran Profilu (`ProfileScreen`)**: Prezentacja podstawowych danych studenta (imię, nazwisko, tytuł), obszernego opisu, zdjęcia profilowego (awatar) oraz przejrzystej listy umiejętności.
- **Lista Projektów (`ProjectsListScreen`)**: Ekran zawierający zestawienie wszystkich zrealizowanych projektów. Każdy element na liście jest interaktywny i pozwala na wgląd w detale.
- **Szczegóły Projektu (`ProjectDetailsScreen`)**: Dedykowany ekran dla wybranego projektu, prezentujący szczegółowy opis oraz użyte w nim technologie.
- **Dodawanie Projektów (`AddProjectScreen`)**: Formularz umożliwiający wprowadzanie nowych projektów z wbudowaną, prostą walidacją upewniającą się, że wszystkie pola zostały wypełnione poprawnie.
- **Ekran Kontaktowy (`ContactScreen`)**: Miejsce zawierające dane kontaktowe z szybkimi, klikalnymi linkami do otwarcia aplikacji pocztowej (`mailto:`) oraz serwisów takich jak GitHub czy LinkedIn.
- **Trwałość danych (Persystencja)**: Wszystkie dodawane projekty, jak i same dane profilowe, są automatycznie zapisywane w pamięci urządzenia dzięki bibliotece `AsyncStorage`. Aplikacja nie traci postępu po restarcie.
- **Konfigurowalne dane startowe**: Możliwość szybkiej zmiany domyślnych projektów oraz profilu (np. swojego GitHuba, projektów) poprzez edycję pliku konfiguracyjnego w formacie JSON (`src/data/initialData.json`).

## 🛠️ Technologie i Biblioteki

- **React Native** / **Expo** (wersja SDK 54)
- **Expo Router** (System nawigacji oparty na strukturze plików w katalogu `/app`)
- **AsyncStorage** (`@react-native-async-storage/async-storage`) - do lokalnej bazy danych (trwałość danych profilu i projektów).

## 📱 Instrukcja uruchomienia

### Wymagania wstępne
Upewnij się, że posiadasz zainstalowane środowisko **Node.js** oraz menedżera pakietów **npm**. 
Aby uruchomić aplikację na fizycznym telefonie, zainstaluj aplikację **Expo Go** ze sklepu Google Play (dla systemu Android) lub App Store (dla systemu iOS).

### Krok 1: Klonowanie repozytorium i instalacja zależności
Pobierz kod aplikacji, otwórz terminal w głównym katalogu projektu i zainstaluj niezbędne biblioteki:
```bash
npm install
```

### Krok 2: Uruchomienie aplikacji
Po zakończeniu instalacji, uruchom serwer developerski poleceniem:
```bash
npx expo start
```
*(Uwaga: jeżeli chcesz wyczyścić pamięć podręczną bundlera, użyj flagi `--clear`: `npx expo start --clear`)*.

### Krok 3: Testowanie na urządzeniu
- **Na fizycznym urządzeniu:** Otwórz aplikację Expo Go na swoim smartfonie i zeskanuj kod QR, który pojawił się w terminalu.
- **Na emulatorze:** Po uruchomieniu serwera, wciśnij klawisz `a`, aby uruchomić aplikację na dostępnym emulatorze Androida (jeśli posiadasz zainstalowane Android Studio) lub `i` dla symulatora iOS (tylko na systemie macOS).

## 📁 Struktura projektu
- `index.js` - Główny punkt wejścia aplikacji.
- `app/` - Ekrany aplikacji i konfiguracja nawigacji przy użyciu Expo Router (`_layout.tsx`, `index.tsx`, `contact.tsx`, oraz podkatalog `projects/` dla listy, formularza i szczegółów).
- `context/` - Zarządzanie stanem aplikacji (kontekst profilu i projektów).
- `utils/` - Narzędzia pomocnicze (obsługa zapisu i odczytu z `AsyncStorage`).
- `src/components/` - Komponenty reużywalne, np. `ProjectCard.tsx`.
- `src/data/initialData.json` - Plik z łatwymi w edycji danymi startowymi profilu i projektów.
