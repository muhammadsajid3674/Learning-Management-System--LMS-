import { CircularProgress, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { useEffect } from 'react'
import { getData, manageUser } from '../../../config/firebaseMethods'
import std from '../../../images/avatar.png'
import graph from '../../../images/result-graph.png'

function StdProfile() {

  const [isLoading, setLoading] = useState(true)
  const [stdData, setStdData] = useState({})

  const { firstName, lastName, email, courses, section, contact, cnic, fatherName, fatherContact } = stdData

  const currentStdData = () => {
    manageUser()
      .then((res) => {
        return getData(`Students/`, res)
          .then((success) => {
            setLoading(false)
            setStdData(success)
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    currentStdData()
  }, [])

  return (
    <>
      {isLoading ? (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh'
        }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container justifyContent='center' minHeight='80vh' spacing={2}>
          <Grid item md={10}>
            <Box className='shadow' sx={{ backgroundColor: '#fff', p: 5, borderRadius: '5px' }}>
              <Grid container alignItems='center' spacing={5}>
                <Grid item md={2}>
                  <img src={std} className='img-fluid' />
                </Grid>
                <Grid item>
                  <Typography variant='h3' className='display-3'>{`${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`}</Typography>
                  <Typography variant='body1'>Welcome to your profile.</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box className='shadow' sx={{ backgroundColor: '#fff', p: 5, borderRadius: '5px' }}>
              <Grid container spacing={2}>
                <Grid item md={5}>
                  <Typography className='fw-bold' variant='h6'>PERSONAL INFORMATION</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography className='fw-bold mb-2' variant='h6'>Name:</Typography>
                  <Typography className='fw-bold mb-2' variant='h6'>Email:</Typography>
                  <Typography className='fw-bold mb-2' variant='h6'>Course:</Typography>
                  <Typography className='fw-bold mb-2' variant='h6'>Section:</Typography>
                  <Typography className='fw-bold mb-2' variant='h6'>Contact:</Typography>
                  <Typography className='fw-bold mb-2' variant='h6'>CNIC:</Typography>
                </Grid>
                <Grid item md={3}>
                  <Typography className='mb-2' variant='h6'>{`${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${lastName.charAt(0).toUpperCase() + lastName.slice(1)}`}</Typography>
                  <Typography className='mb-2' variant='h6'>{email}</Typography>
                  <Typography className='mb-2' variant='h6'>{courses}</Typography>
                  <Typography className='mb-2' variant='h6'>{section}</Typography>
                  <Typography className='mb-2' variant='h6'>{contact}</Typography>
                  <Typography className='mb-2' variant='h6'>{cnic}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box className='shadow' sx={{ backgroundColor: '#fff', p: 5, borderRadius: '5px' }}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <Typography variant='h4'>My Results:</Typography>
                  <Typography variant='subtitle1'>Total number of courses you attend.</Typography>
                  <Typography variant='h5'>1</Typography>
                </Grid>
                <Grid item md={6}>
                  <img className='img-fluid' src={graph}/>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
      {/*  */}
    </>
  )
}

export default StdProfile