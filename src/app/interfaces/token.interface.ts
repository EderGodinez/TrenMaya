export interface TokenResponse {
  rest: Rest
  iat: number
  exp: number
}

export interface Rest {
  id: number
  email: string
  userName: string
  CURP: string
  Estado: number
  fecha_nac: string
  INE: string
}
