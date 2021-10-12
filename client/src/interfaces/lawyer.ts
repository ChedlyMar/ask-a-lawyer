export interface ILawyer {
  _id?: string,
  name?: string,
  email?: string,
  password?: string,
  address?: {
    street: string,
    state: string,
    city: string,
    zip: string,
  },
  speciality?: string,
  description?: string,
  image?: any
}

export interface ILawyerState {
  myLawyer: ILawyer[],
  allLawyer: ILawyer[],
  lawyer?: ILawyer,
  loadLawyer: boolean,
  error?: null,
  isAuth: boolean
}