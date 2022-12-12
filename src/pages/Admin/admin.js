import React, { useEffect } from 'react'
import { manageUser } from '../../config/firebaseMethods'
import AdminLayout from './Pages/adminLayout'
import { useNavigate } from "react-router-dom";

function Admin() {

    const navigate = useNavigate() 

    useEffect(() => {
        manageUser()
            .then((res) => {
            })
            .catch((err) => {
                navigate('/login')
            })
    }, [])
    
    return (
        <>
            <AdminLayout/>
        </>
    )
}

export default Admin