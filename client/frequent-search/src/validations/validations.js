export const validateForm = (formData) => {
  const errors = {};

  if (!/^[A-Za-z]+$/.test(formData.firstName)) {
    errors.firstName = "First name must contain only alphabets.";
  }
  if (!/^[A-Za-z]+$/.test(formData.lastName)) {
    errors.lastName = "Last name must contain only alphabets.";
  }
  if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = "Enter a valid email.";
  }
  if (!formData.country) {
    errors.country = "Country is required.";
  }
  if (!formData.state) {
    errors.state = "State is required.";
  }
  if (!formData.city) {
    errors.city = "City is required.";
  }
  if (!formData.gender) {
    errors.gender = "Gender is required.";
  }
  if (!formData.dob || formData.age < 14 || formData.age > 99) {
    errors.dob = "Age must be between 14 and 99 years.";
  }

  return errors;
};
