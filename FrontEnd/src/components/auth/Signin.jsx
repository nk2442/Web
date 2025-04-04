import { useContext, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

/**
 * Composant de formulaire d'inscription
 * Permet aux nouveaux utilisateurs de créer un compte
 */
function Signin() {
  const { t } = useContext(AppContext);
  const { user, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  // Si l'utilisateur est déjà connecté, rediriger vers le tableau de bord
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Fonction de validation
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.login) errors.login = t('fieldRequired');
    if (!values.firstname) errors.firstname = t('fieldRequired');
    if (!values.lastname) errors.lastname = t('fieldRequired');
    if (!values.password) errors.password = t('fieldRequired');
    if (!values.password2) errors.password2 = t('fieldRequired');
    
    if (values.password && values.password2 && values.password !== values.password2) {
      errors.password2 = t('errorPasswordMismatch');
    }
    
    return errors;
  };
  
  // Utilisation du hook useForm
  const { values, errors, handleChange, handleSubmit } = useForm(
    {
      login: '',
      firstname: '',
      lastname: '',
      password: '',
      password2: ''
    },
    validateForm
  );
  
  // Fonction pour soumettre le formulaire d'inscription
  const submitForm = async (formValues) => {
    setIsLoading(true);
    setServerError('');
    
    try {
      // Envoi des données d'inscription à l'API
      const response = await axios.put('http://localhost:8000/api/user', {
        login: formValues.login,
        password: formValues.password,
        password2: formValues.password2,
        firstname: formValues.firstname,
        lastname: formValues.lastname
      });
      
      if (response.data.success) {
        // Connexion automatique après l'inscription réussie
        await login({
          login: formValues.login,
          password: formValues.password
        });
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      if (error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError(t('unexpectedError'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{t('signin')}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(submitForm);
      }}>
        <div className="form-row">
          <label htmlFor="firstname">{t('firstName')}</label>
          <input 
            id="firstname"
            name="firstname"
            value={values.firstname}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.firstname}
            disabled={isLoading}
          />
          {errors.firstname && <p className="field-error">{errors.firstname}</p>}
        </div>
        
        <div className="form-row">
          <label htmlFor="lastname">{t('lastName')}</label>
          <input 
            id="lastname"
            name="lastname"
            value={values.lastname}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.lastname}
            disabled={isLoading}
          />
          {errors.lastname && <p className="field-error">{errors.lastname}</p>}
        </div>
        
        <div className="form-row">
          <label htmlFor="login">{t('username')}</label>
          <input 
            id="login"
            name="login"
            value={values.login}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.login}
            disabled={isLoading}
          />
          {errors.login && <p className="field-error">{errors.login}</p>}
        </div>
        
        <div className="form-row">
          <label htmlFor="password">{t('password')}</label>
          <input 
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.password}
            disabled={isLoading}
          />
          {errors.password && <p className="field-error">{errors.password}</p>}
        </div>
        
        <div className="form-row">
          <label htmlFor="password2">{t('confirmPassword')}</label>
          <input 
            type="password"
            id="password2"
            name="password2"
            value={values.password2}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.password2}
            disabled={isLoading}
          />
          {errors.password2 && <p className="field-error">{errors.password2}</p>}
        </div>
        
        {serverError && <p className="error-message" role="alert">{serverError}</p>}
        
        <div className="button-group">
          <button 
            type="submit"
            disabled={isLoading}
            className="primary-button"
          >
            {isLoading ? t('loading') : t('signin')}
          </button>
        </div>
      </form>
      <div className="form-footer">
        <p>
          <Link to="/login">{t('login')}</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;