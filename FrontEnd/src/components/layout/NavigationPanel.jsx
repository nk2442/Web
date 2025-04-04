import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import UserPanel from '../user/UserPanel';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeSwitch from '../common/ThemeSwitch';

/**
 * Panneau de navigation principal de l'application
 * Affiche les liens de navigation, les réglages et le panel utilisateur
 */
function NavigationPanel() {
  const { t } = useContext(AppContext);
  const { user } = useAuth();
  
  return (
    <nav id="navigation_panel" className="navigation-panel">
      <div className="logo">
        <Link to="/">Organiz'Asso</Link>
      </div>
      
      <div className="nav-links">
        {user && (
          <>
            <NavLink to="/dashboard">{t('dashboard')}</NavLink>
            <NavLink to="/messages">{t('privateMessages')}</NavLink>
            <NavLink to="/profile">{t('profile')}</NavLink>
            {user.role === 'admin' && <NavLink to="/admin">{t('admin')}</NavLink>}
          </>
        )}
      </div>
      
      <div className="settings">
        <LanguageSwitcher />
        <ThemeSwitch />
      </div>
      
      <UserPanel />
    </nav>
  );
}

export default NavigationPanel;