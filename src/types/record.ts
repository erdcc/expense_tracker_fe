import { ThunkDispatch } from "redux-thunk";
import { CategoryType } from "./category";

export interface RecordType {
    id: number
    title: string
    amount: number
    createdAt: string
    updatedAt: string
    category: CategoryType
}
 
export interface RecordState {
    data: RecordType[]
    loading: boolean
    error: string
}
export interface RecordForm {
  title: string
  amount: number
  category_id:number  
  }
  
  interface GET_START {
    type: "GET_RECORDS_START"
  }
  
  interface GET_SUCCESS {
    type: "GET_RECORDS_SUCCESS"
    payload: RecordType[]
  }
  
  interface GET_ERROR {
    type: "GET_RECORDS_ERROR"
  }
  
  interface ADD_START {
    type: "ADD_RECORD_START"
  }
  
  interface ADD_SUCCESS {
    type: "ADD_RECORD_SUCCESS"
    payload: RecordType
  }
  
  interface ADD_ERROR {
    type: "ADD_RECORD_ERROR"
  }
  interface UPDATE_START {
    type: "UPDATE_RECORD_START"
  }
  
  interface UPDATE_SUCCESS {
    type: "UPDATE_RECORD_SUCCESS"
    payload: RecordType
  }
  
  interface UPDATE_ERROR {
    type: "UPDATE_RECORD_ERROR"
  }
  interface DELETE_START {
    type: "DELETE_RECORD_START"
  }
  
  interface DELETE_SUCCESS {
    type: "DELETE_RECORD_SUCCESS"
    payload: number
  }
  
  interface DELETE_ERROR {
    type: "DELETE_RECORD_ERROR"
  }

export type RecordAction = GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR
  | DELETE_START
  | DELETE_SUCCESS
  | DELETE_ERROR

export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>