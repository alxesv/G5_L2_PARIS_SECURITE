import validator from 'validator';


export const sanitizePassword = (password) => {
  if (
    validator.isLength(password, { min: 8 }) && 
    /\d/.test(password) && 
    /[A-Z]/.test(password) && 
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) 
  ) {
    return validator.escape(password); 
  } else {
    throw new Error('Le mot de passe doit contenir au moins 8 caractères, des lettres majuscules, des caractères alphanumériques et des caractères spéciaux');
  }
};

export const sanitizeString = (name, key) => {
    if (validator.isLength(name, { min: 2 }) ){
        return validator.escape(name); 
    } else {
        throw new Error(key+' invalide !');
      }
  };

export const sanitizeEmail = (email) => {
    if (validator.isEmail(email)) {
      return validator.normalizeEmail(email)
    } else {
      throw new Error('Adresse e-mail invalide');
    }
  };

