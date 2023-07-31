import { CategoryDispatch, CategoryForm, CategoryType } from "../../types/category";
import Api from "../../utils/Api";

export const getCategories=()=> async (dispatch:CategoryDispatch)=>{
    dispatch({type:"GET_CATEGORIES_START"})
    try{
        const response = await Api().get<CategoryType[]>("/categories")
        dispatch({type:"GET_CATEGORIES_SUCCESS",payload:response.data})
    }catch{
        dispatch({type:"GET_CATEGORIES_ERROR"})
    }
}

export const addCategory = (form:CategoryForm)=> async(dispatch:CategoryDispatch)=>{
    dispatch({type:"ADD_CATEGORY_START"})
    try{
        const response=await Api().post<CategoryType>("/categories",form)
        dispatch({type:"ADD_CATEGORY_SUCCESS",payload: response.data})
    }catch{
        dispatch({type:"ADD_CATEGORY_ERROR"})
    }
}

export const updateCategory = (form:Partial<CategoryForm>,categoryId:number)=> async(dispatch:CategoryDispatch)=>{
    dispatch({type:"UPDATE_CATEGORY_START"})
    try{
        const response=await Api().put<CategoryType>("/categories/"+categoryId,form)
        dispatch({type:"UPDATE_CATEGORY_SUCCESS",payload: response.data})
    }catch{
        dispatch({type:"UPDATE_CATEGORY_ERROR"})
    }
}

export const deleteCategory = (categoryId:number)=> async(dispatch:CategoryDispatch)=>{
    dispatch({type:"DELETE_CATEGORY_START"})
    try{
        await Api().delete<CategoryType>("/categories/"+categoryId)
        dispatch({type:"DELETE_CATEGORY_SUCCESS",payload: categoryId})
    }catch{
        dispatch({type:"DELETE_CATEGORY_ERROR"})
    }
}