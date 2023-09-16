const VerifyEmailAndPassword = ({ email, password }) => {

  if (!email || !password) {
    return false;
  }

  if (typeof email !== 'string' || typeof password !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  if (password.length < 8) {
    return false;
  }

  if (email.trim().length !== email.length || password.trim().length !== password.length) {
    return false;
  }

  return true;
}

export default VerifyEmailAndPassword