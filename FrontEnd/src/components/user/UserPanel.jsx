import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import Logout from '../auth/Logout';
import ProfilePreview from './ProfilePreview';

/**
 * Panneau utilisateur affiché dans la barre de navigation
 * Montre soit un aperçu du profil et un bouton de déconnexion (si connecté),
 * soit des liens d'authentification (si non connecté)
 */
function UserPanel() {
  const { t } = useContext(AppContext);
  const { user } = useAuth();
  
  // Vérifier si l'utilisateur est le compte développeur spécial
  const isDevAccount = user && user.login === "lmao";
  
  return (
    <div className="user-panel">
      {user ? (
        <>
          <ProfilePreview user={user} />
          {isDevAccount && (
            <div className="dev-mode-indicator" title="Mode développement">🛠️</div>
          )}
          <Logout />
        </>
      ) : (
        <div className="auth-links">
          <Link to="/login" className="login-link">{t('login')}</Link>
          <Link to="/signin" className="signup-link">{t('signin')}</Link>
        </div>
      )}
    </div>
  );
}

export default UserPanel;