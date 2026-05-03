export const VALIDATION_MESSAGES: any = {
    name: {
      required: 'Full Name is required.',
      minlength: 'Name must be at least 3 characters.'
    },
  
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.'
    },
    login: {
      required: 'You must write an Email or Username.',
      minlength: 'You must write at least 3 characters.'
    },
  
    gender: {
      required: 'Please select your gender.'
    },
  
    dateOfBirth: {
      required: 'Date of birth is required.',
      futureDate: 'Date of birth cannot be in the future.'
    },
  
    password: {
      required: 'Password is required.',
      pattern:
        'Must contain at least 8 chars, uppercase, lowercase, number & special.'
    },
  
    rePassword: {
      required: 'Please confirm your password.',
      passwordMismatch: 'Passwords do not match.'
    }
  };