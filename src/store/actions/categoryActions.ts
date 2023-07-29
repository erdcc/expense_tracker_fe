import { CategoryDispatch, CategoryType } from "../../types/category";
import Api from "../../utils/Api";

export const getCategories=()=> async (dispatch:CategoryDispatch)=>{
    dispatch({type:"GET_CATEGORIES_START"})
    try{
        const response = await Api.get<CategoryType[]>("/categories")
        dispatch({type:"GET_CATEGORIES_SUCCESS",payload:response.data})
    }catch{
        dispatch({type:"GET_CATEGORIES_ERROR"})
    }
}