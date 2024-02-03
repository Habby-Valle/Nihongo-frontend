export const nameIsValid = (name: string) => {
  const fullName = name.replace(/\s+/g, " ")
  if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s-]+$/.test(fullName) || fullName.trim().split(/\s+/).length < 2) {
    return false
  } else {
    return true
  }
}

export const usernameIsValid = (username: string) => {
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return false
  } else {
    return true
  }
}

export const dateBirthIsValid = (dateBirth: string) => {
  const dateBirthRegex = /^\d{4}-\d{2}-\d{2}$/
  const hasValidFormat = dateBirthRegex.test(dateBirth)

  if (!hasValidFormat) {
    return false
  }

  const [year, month, day] = dateBirth.split("-")

  const date = new Date(Number(year), Number(month) - 1, Number(day))

  const isDateValid =
    date.getFullYear() === Number(year) && date.getMonth() === Number(month) - 1 && date.getDate() === Number(day)

  return isDateValid
}

export const emailIsValid = (email: string) => {
  const emailRegex =
    /^(?![^a-zA-Z0-9])[^.:;](?!.*\.\.)(?:"(?:[\x20-\x21\x23-\x5B\x5D\x5F\x60\x7B-\x7E]|\\[\x09\x20-\x7E])*"|[\x21-\x7E]+)@(([a-zA-Z][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.)+[a-zA-Z]{2,}|(\[((?:IPv6:)?(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}|\[(?:(?:[a-fA-F0-9]{1,4}:)*[a-fA-F0-9]{1,4}\])\]))$)/
  const hasValidFormat = emailRegex.test(email)

  if (!email.includes("@") || !hasValidFormat) {
    return false
  }

  const hasMinLength = email.split("@")[0].length >= 3
  const domain = email.split("@")[1]

  const domainParts = domain.split(".")
  const hasValidDomain = domainParts.length >= 2 && domainParts.every((part) => /^[a-zA-Z0-9-]+$/.test(part))

  return hasMinLength && hasValidDomain
}

export const removePhoneFormatting = (telefone: string) => {
  return telefone.replace(/\s|\(|\)|-/g, "")
}

export const applyPhoneMask = (telefone: string | undefined) => {
  const value = telefone?.replace(/\D/g, "")

  if (value && value.length <= 10) {
    return `(${value.slice(0, 2)}) ${value.slice(2)}`
  } else if (value && value.length <= 11) {
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`
  } else {
    return telefone
  }
}

export const getPasswordValidationErrorMessage = (text: string) => {
  const passwordLength = text.length
  const containsUpperCase = /[A-Z]/.test(text)
  const containsLowerCase = /[a-z]/.test(text)
  const containsNumber = /\d/.test(text)
  const containsSpecialChar = /[\W_]/.test(text)

  if (passwordLength < 8) {
    return "A senha precisa ter no mínimo 8 dígitos."
  } else if (!containsUpperCase || !containsLowerCase || !containsNumber || !containsSpecialChar) {
    return "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
  }

  return ""
}

export const passwordIsValid = (password: string) => {
  const passwordLength = password.length
  const containsUpperCase = /[A-Z]/.test(password)
  const containsLowerCase = /[a-z]/.test(password)
  const containsNumber = /\d/.test(password)
  const containsSpecialChar = /[\W_]/.test(password)

  if (passwordLength === 0) {
    return false
  } else if (passwordLength < 8) {
    return false
  } else if (!containsUpperCase || !containsLowerCase || !containsNumber || !containsSpecialChar) {
    return false
  } else {
    return true
  }
}
