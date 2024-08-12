export const validateLogin = ({ formData: { username, password } }) => {
  const errors = {};

  if (!username) {
    errors.username = "Requerido";
  } else if (username.length < 3) {
    errors.username = "El nombre del usuario debe tener 3 caracteres o mas";
  }

  if (!password) {
    errors.password = "Requerido";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener 6 caracteres o mas";
  }

  return errors;
};
