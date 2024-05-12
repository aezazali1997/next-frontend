type TokenPayload = {
  accessToken:string;
  role:string
}
export class LocalStorageAccess {
  static setToken = (token:TokenPayload)=>{
    localStorage.setItem('role',token.role)
    localStorage.setItem('token',token.accessToken)

  }
  static removeToken = ()=>{
    localStorage.removeItem('role')
    localStorage.removeItem('token')

  }
}