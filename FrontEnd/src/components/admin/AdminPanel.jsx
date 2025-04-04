import { useState, useEffect } from 'react';

// Panneau d'administration
// Permet aux administrateurs de gérer les utilisateurs et les approbations
function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Chargement des données utilisateurs (simulé)
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, login: 'user1', firstName: 'John', lastName: 'Doe', role: 'user', status: 'active' },
        { id: 2, login: 'user2', firstName: 'Jane', lastName: 'Smith', role: 'admin', status: 'active' },
        { id: 3, login: 'user3', firstName: 'Mike', lastName: 'Johnson', role: 'user', status: 'active' }
      ]);
      
      setPendingUsers([
        { id: 4, login: 'newuser1', firstName: 'Alice', lastName: 'Brown', role: 'user', status: 'pending' },
        { id: 5, login: 'newuser2', firstName: 'Bob', lastName: 'White', role: 'user', status: 'pending' }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);
  
  // Gestionnaire pour approuver un utilisateur en attente
  const handleApproveUser = (userId) => {
    const userToApprove = pendingUsers.find(user => user.id === userId);
    if (userToApprove) {
      userToApprove.status = 'active';
      setUsers([...users, userToApprove]);
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
    }
  };
  
  // Gestionnaire pour rejeter une demande d'utilisateur
  const handleRejectUser = (userId) => {
    setPendingUsers(pendingUsers.filter(user => user.id !== userId));
  };
  
  // Gestionnaire pour modifier le rôle d'un utilisateur
  const handleChangeRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };
  
  // Affichage d'un indicateur de chargement si nécessaire
  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }
  
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      
      {/* Section des utilisateurs en attente d'approbation */}
      <section className="pending-approvals">
        <h3>Pending Approvals</h3>
        {pendingUsers.length === 0 ? (
          <p>No pending approvals</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Login</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.login}</td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>
                    <button onClick={() => handleApproveUser(user.id)}>Approve</button>
                    <button onClick={() => handleRejectUser(user.id)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      
      {/* Section de gestion des utilisateurs existants */}
      <section className="user-management">
        <h3>User Management</h3>
        <table>
          <thead>
            <tr>
              <th>Login</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.login}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.role}</td>
                <td>
                  <select 
                    value={user.role}
                    onChange={(e) => handleChangeRole(user.id, e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminPanel;