import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Composant pour le bouton de déconnexion
 */
function Logout() {
  const { t } = useContext(AppContext);
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };
  
  return (
    <button 
      className="logout-button" 
      onClick={handleLogout}
      disabled={isLoading}
      aria-label={t('logout')}
    >
      {isLoading ? t('loading') : t('logout')}
    </button>
  );
}

export default Logout;
