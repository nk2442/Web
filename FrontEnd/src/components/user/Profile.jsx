import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import MessageList from '../messages/MessageList';

// Page de profil utilisateur
// Permet de consulter et modifier les informations de profil
// et d'afficher les messages postés par l'utilisateur
function Profile() {
  const { user } = useContext(AppContext);
  
  // État pour gérer le mode édition et les données du profil
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    bio: user.bio || ''
  });
  
  // État pour stocker les messages de l'utilisateur (à remplir via API)
  const [userMessages, setUserMessages] = useState([]);

  // Gestionnaire pour mettre à jour les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  // Gestionnaire de soumission du formulaire d'édition
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dans une application réelle, vous enverriez les données à une API
    setIsEditing(false);
  };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      
      <div className="profile-container">
        <div className="profile-info">
          {isEditing ? (
            // Formulaire d'édition du profil
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              <div className="button-group">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </form>
          ) : (
            // Affichage des informations de profil
            <div className="profile-display">
              <h3>{profileData.firstName} {profileData.lastName}</h3>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Bio:</strong> {profileData.bio || 'No bio set'}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          )}
        </div>
        
        <div className="user-messages">
          <h3>Your Messages</h3>
          {userMessages.length > 0 ? (
            <MessageList messages={userMessages} />
          ) : (
            <p>You haven't posted any messages yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;