export const validators = {
    required: (value) => {
      return value ? null : "This field is required"
    },
  
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(value) ? null : "Please enter a valid email address"
    },
  
    minLength: (length) => (value) => {
      return value && value.length >= length ? null : `This field must be at least ${length} characters`
    },
  
    maxLength: (length) => (value) => {
      return value && value.length <= length ? null : `This field must be no more than ${length} characters`
    },
  }
  
  export const validateForm = (formData, validationRules) => {
    const errors = {}
    let isValid = true
  
    Object.keys(validationRules).forEach((field) => {
      const fieldRules = validationRules[field]
      const value = formData[field]
  
      for (const rule of fieldRules) {
        const error = rule(value)
        if (error) {
          errors[field] = error
          isValid = false
          break
        }
      }
    })
  
    return { isValid, errors }
  }
  
  