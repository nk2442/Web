import { useContext } from 'react';
import { AppContext } from '../../App';
import AdminPanel from '../admin/AdminPanel';

// Page qui encapsule le composant AdminPanel
// Ajoute un titre traduit à la page d'administration
function AdminPage() {
  const { t } = useContext(AppContext);
  
  return (
    <div className="page-container">
      <h1>{t('admin')}</h1>
      <AdminPanel />
    </div>
  );
}

export default AdminPage;
