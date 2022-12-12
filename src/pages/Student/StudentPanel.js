import React, { useEffect } from 'react'
import { manageUser } from '../../config/firebaseMethods'
import StdLayout from './pages/studentLayout'
import { useNavigate } from "react-router-dom";

function StdPanel() {
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
          <StdLayout/>
        </>
    )
}

export default StdPanel