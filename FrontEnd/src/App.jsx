import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import './styles/App.css';
import { getTranslations } from './utils/i18n';

// Import des contextes et providers
import { AuthProvider } from './contexts/AuthContext';

// Import des composants
import NavigationPanel from './components/layout/NavigationPanel';
import Login from './components/auth/Login';
import Signin from './components/auth/Signin';
import Dashboard from './components/pages/Dashboard';
import PrivateMessagesPage from './components/pages/PrivateMessagesPage';
import ProfilePage from './components/pages/ProfilePage';
import AdminPage from './components/pages/AdminPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Création du contexte global de l'application pour les fonctionnalités non-auth
export const AppContext = createContext(null);

function App() {
  // États pour gérer le thème et la langue 
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');
  
  // Fonction pour basculer entre les thèmes clair et sombre
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Fonction pour changer la langue de l'application
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  
  // Helper pour la traduction des textes selon la langue sélectionnée
  const translations = getTranslations(language);
  const t = (key) => translations[key] || key;

  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContext.Provider value={{ theme, toggleTheme, language, changeLanguage, t }}>
          <div className={`app ${theme}`}>
            <BrowserRouter>
              <NavigationPanel />
              <main>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signin" element={<Signin />} />
                  
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/messages" element={<ProtectedRoute><PrivateMessagesPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/admin" element={<ProtectedRoute isAdmin={true}><AdminPage /></ProtectedRoute>} />
                  
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>
            </BrowserRouter>
          </div>
        </AppContext.Provider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
