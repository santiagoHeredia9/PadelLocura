export const validateRegistration = ({
  formData: { username, email, phoneNumber, password, confirmPassword },
}) => {
  const errors = {};

  if (!username) {
    errors.username = "Requerido";
  } else if (username.length < 3) {
    errors.username = "El nombre del usuario debe tener 3 caracteres o mas";
  }

  if (!email) {
    errors.email = "Requerido";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "El email no es válido";
  }

  if (!phoneNumber) {
    errors.phoneNumber = "Requerido";
  } else if (!/^\d{10}$/.test(phoneNumber)) {
    errors.phoneNumber = "El número de teléfono debe tener 10 dígitos";
  }

  if (!password) {
    errors.password = "Requerido";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener 6 caracteres o mas";
  }

  if (!password) {
    errors.confirmPassword = "Debes confirmar la contraseña";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};
