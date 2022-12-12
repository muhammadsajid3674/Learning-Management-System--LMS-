import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function NotFound() {
    return (
        <>
            <Box className='text-center'>
                <Typography variant="p" className='display-2'>Page Not Found</Typography>
            </Box>
        </>
    )
}

export default NotFound