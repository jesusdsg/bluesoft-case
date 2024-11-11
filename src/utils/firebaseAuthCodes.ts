const validateError = (error: { code: string }): string => {
  let errorMessage =
    'Error al ingresar usuario, por favor inténtelo mas tarde.';
  switch (error.code) {
    case 'auth/weak-password':
      errorMessage = `Contraseña débil, debe tener al menos 6 caracteres`;
      break;
    case 'auth/invalid-email':
      errorMessage = `formato de correo incorrecto`;
      break;
    case 'auth/email-already-in-use':
      errorMessage = `Correo ya está en uso, prueba con otro correo`;
      break;
    case 'auth/too-many-requests':
      errorMessage =
        'El acceso a esta cuenta se ha deshabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puedes restaurarlo inmediatamente restableciendo tu contraseña o puedes volver a intentarlo más tarde.';
      break;
    case 'auth/invalid-credential':
      errorMessage = 'Las credenciales son incorrectas.';
      break;
  }
  return errorMessage;
};

export { validateError };
