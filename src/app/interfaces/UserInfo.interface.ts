export class User implements UserInfo{
  userName:string
  password:string
  email:string
  CURP	:string
  Estado:number
  fecha_nac:Date
  INE:string
  Role:string
  constructor(username:string,pass:string,email:string,CURP:string,state:number,date:Date,INE:string,Role:string){
  this.userName=username
  this.password=pass
  this.email=email
  this.CURP	=CURP
  this.Estado=state
  this.fecha_nac=date
  this.INE=INE
  this.Role=Role
    }
}
export interface UserInfo{
    userName:string
    password:string
    email:string
    CURP	:string
    Estado:number
    fecha_nac:Date
    INE:string
    Role:string
}
