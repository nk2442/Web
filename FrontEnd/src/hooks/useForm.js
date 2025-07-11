import { useState } from 'react';

/**
 * Hook personnalisé pour gérer les formulaires
 * Facilite la gestion des valeurs, erreurs et soumissions de formulaires
 * 
 * @param {Object} initialValues - Valeurs initiales des champs du formulaire
 * @param {Function} validate - Fonction de validation retournant des erreurs
 * @returns {Object} - Objet contenant les états et gestionnaires de formulaire
 */
export function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = async (callback) => {
    setIsSubmitting(true);
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      // Si pas d'erreurs, appeler le callback
      if (Object.keys(validationErrors).length === 0) {
        await callback(values);
      }
    } else {
      await callback(values);
    }
    
    setIsSubmitting(false);
  };
  
  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues
  };
}
