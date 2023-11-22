export interface Reservation {
  ID_Reservacion: number
  Fecha_Reserva: string
  Fecha_Salida: string
  Numero_pasajeros: number
  ReservationEmail: string
  UserId: UserId
  TrenId: TrenId
  Origen: Origen
  Destino: Destino
}

export interface UserId {
  id: number
  email: string
  userName: string
  password: string
  CURP: string
  Estado: number
  fecha_nac: string
  INE: string
}

export interface TrenId {
  id: number
  horaSalida: string
}

export interface Origen {
  id: number
  Tramo: number
  nombre: string
  Estado: number
  tipo: number
}

export interface Destino {
  id: number
  Tramo: number
  nombre: string
  Estado: number
  tipo: number
}
