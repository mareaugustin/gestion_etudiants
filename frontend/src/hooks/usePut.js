import React, {useState} from "react";
import axios from 'axios'
import { useGetUrl } from "./useGetUrl";


export function usePut(url){
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const { apiUrl } = useGetUrl();

    async function putData(body){
        try{
            setLoading(true)
            setError(null)
            setSuccess(null)
            
            const response = await axios.put(apiUrl+url,body)
            setData(response.data.data)

            setSuccess(true)

        }catch(err){
            if(err.response){
                setError(err.response?.data?.message)
            }
            setError('Erreur ! Veuillez réessayer')
        }finally{
            setLoading(false)
        }
    }

    return {loading, success, error, data, putData}
}