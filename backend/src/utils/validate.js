exports.validateRegistrationData = (data) => {
  const errors = [];

  // email Validation
  if (!data.email || !data.email.trim()) {
    errors.push('Email is required');
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Invalid email format');
  }

  // password Validation
  if (!data.password || !data.password.trim()) {
    errors.push('Password is required');
  } else if (data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  // Password strength validation
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(data.password)) {
    errors.push('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  }

  // Check for password similarity with email
  if (data.email && data.password && data.email.includes(data.password)) {
    errors.push('Password should not be part of the email');
  }

  return errors.length > 0 ? errors : null;
};
