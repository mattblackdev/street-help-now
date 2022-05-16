export const OneHundredPattern = /([A-z0-9À-ž ]){2,100}/
export const Title16Pattern = /^([A-zÀ-ž ]){2,16}/
export const UsernamePattern = OneHundredPattern
export const PasswordPattern = /([a-z ]){16,100}/
export const SlugPattern = /^[a-z]+(?:-[a-z]+)*$/
export const KeyPattern = /^([a-z]){1,44}/
