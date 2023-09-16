export function verifyEmailAndPassword(userData) {
  const { email, password } = userData;

  // Verificar se o objeto userData é válido
  if (!userData || typeof userData !== 'object') {
    return false;
  }

  // Verificar se o email e password são strings
  if (typeof email !== 'string' || typeof password !== 'string') {
    return false;
  }

  // Verificar se o email é válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Verificar se a senha tem pelo menos 8 caracteres
  if (password.length < 8) {
    return false;
  }

  // Verificar se o email e a senha não contêm espaços em branco
  if (email.trim().length !== email.length || password.trim().length !== password.length) {
    return false;
  }

  // Todas as verificações passaram, retornar true
  return true;
}