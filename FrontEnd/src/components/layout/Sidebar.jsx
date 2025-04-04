import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../App';

// Barre latérale contenant les liens de navigation secondaires
// Affiche différents liens selon le rôle de l'utilisateur
function Sidebar() {
  const { user, t } = useContext(AppContext);

  return (
    <aside className="sidebar">
      <h3>{t('menu')}</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard">
              <span className="icon">🏠</span>
              {t('dashboard')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages">
              <span className="icon">💬</span>
              {t('privateMessages')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <span className="icon">👤</span>
              {t('profile')}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings">
              <span className="icon">⚙️</span>
              {t('settings')}
            </NavLink>
          </li>
          {user && user.role === 'admin' && (
            <li>
              <NavLink to="/admin">
                <span className="icon">🛡️</span>
                {t('admin')}
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;