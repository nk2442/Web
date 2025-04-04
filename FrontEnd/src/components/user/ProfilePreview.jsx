import { Link } from 'react-router-dom';

// Aperçu du profil utilisateur affiché dans le panneau utilisateur
// Montre l'avatar (ou les initiales) et le nom de l'utilisateur
function ProfilePreview({ user }) {
  return (
    <div className="profile-preview">
      <div className="avatar">
        {user.avatar ? (
          <img src={user.avatar} alt={`${user.firstName}'s avatar`} />
        ) : (
          <div className="avatar-placeholder">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>
        )}
      </div>
      <div className="user-info">
        <p className="user-name">{user.firstName} {user.lastName}</p>
        <Link to="/profile" className="view-profile-link">View Profile</Link>
      </div>
    </div>
  );
}

export default ProfilePreview;