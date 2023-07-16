import React, { useEffect, useState } from 'react'
import axios from 'axios'

const useFetch = (url) => {
    console.log(url)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const[ error, setError ] = useState("")

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true)
            try {
                const response = await axios.get(url)
                setData(response.data)
                console.log(response.data)
            } catch(error) {
                console.log(error)
                setError(error)
            }
            setLoading(false)
        }

        fetchData()
    }, [])

  return { data, loading, error }
}

export default useFetch