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

  // additional Validations
  // - check for password strength (uppercase, lowercase, numbers, special characters)
  // - check for password similarity with email
  return errors.length > 0 ? errors : null;
};