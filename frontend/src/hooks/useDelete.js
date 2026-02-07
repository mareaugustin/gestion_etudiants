import React, {useState} from "react";
import axios from 'axios'
import {useGetUrl} from '../hooks/useGetUrl'


export function useDelete(url){
    
    const { apiUrl } = useGetUrl()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    async function deleteData(){
        try{
            setLoading(true)
            setError(null)
            setSuccess(null)

            const response = await axios.delete(apiUrl+url)

            setSuccess(true)
        }catch(e){
            setError(e.message || e.response?.data?.message || 'Errreur lors de la suppression')
        }finally{
            setLoading(false)
        }
    }

    return {loading, success, error, deleteData}
}