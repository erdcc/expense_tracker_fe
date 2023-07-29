import { RecordDispatch, RecordForm, RecordType } from "../../types/record"
import Api from "../../utils/Api"

export const getRecords=()=> async (dispatch:RecordDispatch)=>{
    dispatch({type:"GET_RECORDS_START"})
    try{
        const response = await Api.get<RecordType[]>("/records")
        response.data.sort((a,b)=>b.id - a.id)
        dispatch({type:"GET_RECORDS_SUCCESS",payload:response.data})
    }catch{
        dispatch({type:"GET_RECORDS_ERROR"})
    }
}

export const addRecord = (form:RecordForm)=> async(dispatch:RecordDispatch)=>{
    dispatch({type:"ADD_RECORD_START"})
    try{
        const response=await Api.post<RecordType>("/records",form)
        dispatch({type:"ADD_RECORD_SUCCESS",payload: response.data})
    }catch{
        dispatch({type:"ADD_RECORD_ERROR"})
    }
}

export const updateRecord = (form:Partial<RecordForm>,recordId:RecordType["id"])=> async(dispatch:RecordDispatch)=>{
    dispatch({type:"UPDATE_RECORD_START"})
    try{
        const response=await Api.put<RecordType>("/records/"+recordId, form)
        dispatch({type:"UPDATE_RECORD_SUCCESS",payload: response.data})
    }catch{
        dispatch({type:"UPDATE_RECORD_ERROR"})
    }
}

export const deleteRecord = (recordId:number)=> async(dispatch:RecordDispatch)=>{
    dispatch({type:"DELETE_RECORD_START"})
    try{
        await Api.delete<RecordType>("/records/"+recordId)
        dispatch({type:"DELETE_RECORD_SUCCESS",payload: recordId})
    }catch{
        dispatch({type:"DELETE_RECORD_ERROR"})
    }
}