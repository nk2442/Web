import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Identifiants secrets pour le développement
const DEV_CREDENTIALS = {
  login: "lmao",
  password: "lmao",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Vérifier si l'utilisateur a une session active au chargement
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/check-session', {
          withCredentials: true
        });
        
        if (response.data.success && response.data.user) {
          setUser(response.data.user);
        }
        setError(null); // Réinitialiser les erreurs en cas de succès
      } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
        // Ne pas afficher d'erreur visible à l'utilisateur pour une vérification de session
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Fonction pour connecter un utilisateur
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // Vérifier les identifiants de développement secrets
      if (credentials.login === DEV_CREDENTIALS.login && 
          credentials.password === DEV_CREDENTIALS.password) {
        
        // Créer un utilisateur fictif avec des droits d'administrateur
        const devUser = {
          login: "lmao",
          firstName: "Dev",
          lastName: "Mode",
          role: "admin",
          id: "dev-0001"
        };
        
        setUser(devUser);
        console.log("🔑 Connexion en mode développement");
        return { success: true };
      }
      
      // Connexion normale via API
      const response = await axios.post('http://localhost:8000/api/user/login', credentials, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erreur de connexion';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = async () => {
    setLoading(true);
    try {
      // Si c'est l'utilisateur de développement, déconnecter directement
      if (user && user.login === DEV_CREDENTIALS.login) {
        setUser(null);
        return true;
      }
      
      // Déconnexion normale via API
      await axios.get('http://localhost:8000/api/user/logout', {
        withCredentials: true
      });
      setUser(null);
      return true;
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Effacer une erreur spécifique
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé pour utiliser facilement le contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}
