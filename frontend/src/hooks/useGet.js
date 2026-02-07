import React, {useState, useEffect} from "react";
import axios from "axios";
import { useGetUrl } from "./useGetUrl";

export function useGet(url){
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const { apiUrl } = useGetUrl();

    
    async function getData(){
        if( !url ) return;
        try{
            setLoading(true)
            setError(null)

            const response = await axios.get(apiUrl+url)
            setData(response.data.data)

            setSuccess(true)

        }catch(err){
            setError(err.message || err?.response?.data?.error || 'Erreur de récupération de données')
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    },[url])

    return {loading, success, error, data, getData}
}