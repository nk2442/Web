import { useContext } from 'react';
import { AppContext } from '../../App';
import Profile from '../user/Profile';

// Page qui encapsule le composant Profile
// Ajoute un titre traduit à la page de profil
function ProfilePage() {
  const { t } = useContext(AppContext);
  
  return (
    <div className="page-container">
      <h1>{t('profile')}</h1>
      <Profile />
    </div>
  );
}

export default ProfilePage;
