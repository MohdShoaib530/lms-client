export function isEmail(string){
    return string.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
}

export function isPassword(password){
  return password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
}