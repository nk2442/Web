import { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Composant de formulaire de connexion
 * Permet aux utilisateurs de se connecter à l'application via l'API backend
 */
function Login() {
  const { t } = useContext(AppContext);
  const { user, login } = useAuth();
  
  // États pour stocker les valeurs du formulaire, les messages d'erreur et l'état de chargement
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Si l'utilisateur est déjà connecté, rediriger vers le tableau de bord
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Gestionnaires pour mettre à jour les valeurs du formulaire
  const getLogin = (evt) => {
    setLoginInput(evt.target.value);
    if (error) setError("");
  };
  
  const getPassword = (evt) => {
    setPassword(evt.target.value);
    if (error) setError("");
  };
  
  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    
    // Validation des champs obligatoires
    if (!loginInput || !password) {
      setError(t('errorEmptyFields'));
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Utilisation de la fonction login du contexte d'authentification
      const result = await login({
        login: loginInput,
        password
      });
      
      if (!result.success) {
        setError(result.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Rendu du formulaire avec support d'accessibilité
  return (
    <div className="form-container">
      <h2>{t('login')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="login">{t('username')}</label>
          <input 
            id="login" 
            onChange={getLogin}
            value={loginInput}
            aria-required="true"
            aria-invalid={error && !loginInput ? "true" : "false"}
            disabled={isLoading}
          />
        </div>
        <div className="form-row">
          <label htmlFor="mdp">{t('password')}</label>
          <input 
            type="password" 
            id="mdp" 
            onChange={getPassword}
            value={password}
            aria-required="true"
            aria-invalid={error && !password ? "true" : "false"}
            disabled={isLoading}
          />
        </div>
        {error && <p className="error-message" role="alert">{error}</p>}
        <div className="button-group">
          <button 
            type="submit"
            disabled={isLoading}
            className="primary-button"
          >
            {isLoading ? t('loading') : t('login')}
          </button>
        </div>
      </form>
      <div className="form-footer">
        <p>{t('noAccount')} <Link to="/signin">{t('createAccount')}</Link></p>
      </div>
    </div>
  );
}

export default Login;
