import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getData } from '../../../config/firebaseMethods'
import CusDataTable from '../../../components/CusDataTable/CusDataTable';
import MuiDataTable from '../../../components/CusDataTable/MuiDataTable';

function RegisterStd() {

  const [registerStd, setRegisterStd] = useState([])
  const [course, setCourse] = useState([])
  const [quizzes, setQuizzes] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getRegisterSTD = () => {
    return getData('Students/')
      .then((res) => {
        setRegisterStd(res);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const getCourses = () => {
    return getData('Courses/')
      .then((res) => {
        setCourse(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const getQuizzes = () => {
    return getData('QuizQuestions/')
      .then((res) => {
        setQuizzes(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getRegisterSTD()
    getCourses()
    getQuizzes()
  }, [])


  return (
    <>
      <Grid container justifyContent='center' minHeight="100vh" spacing={3}>
        <Grid item xs={12} md={10}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
                <Grid container spacing={3}>
                  <Grid item md={12}>
                    <Typography variant='p' className='display-4'>Overview</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Grid container className='text-white shadow rounded' justifyContent='space-around' alignItems='center' sx={{ backgroundColor: '#b2282d', px: 2 }}>
                      <Grid item className='py-4 px-3'>
                        <span className='fs-1'>{registerStd.length}</span>
                        <p className='text-dark-50'>Students</p>
                      </Grid>
                      <Grid item className='display-3'>
                        <i className="fa-solid fa-user"></i>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Grid container className='text-white shadow rounded' justifyContent='space-around' alignItems='center' sx={{ backgroundColor: '#3c887e', px: 2 }}>
                      <Grid item className='py-4 px-3'>
                        <span className='fs-1'>{course.length}</span>
                        <p className='text-dark-50'>Courses</p>
                      </Grid>
                      <Grid item className='display-3'>
                        <i className="fa-solid fa-comment"></i>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Grid container className='text-white shadow rounded' justifyContent='space-around' alignItems='center' sx={{ backgroundColor: '#333333', px: 2 }}>
                      <Grid item className='py-4 px-3'>
                        <span className='fs-1'>{quizzes.length}</span>
                        <p className='text-dark-50'>Quizzes</p>
                      </Grid>
                      <Grid item className='display-3'>
                        <i className="fa-solid fa-question"></i>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid >
            <Grid item xs={12} md={12}>
              <Box sx={{ backgroundColor: '#fff', p: 4, my: 2, borderRadius: '5px' }}>
                <Typography variant="p" className="display-4">Student List</Typography>
                {isLoading ?
                  (<Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <CircularProgress />
                  </Box>) : (
                    <MuiDataTable
                      onClickRow={(e) => console.log(e)}
                      dataSource={registerStd}
                      colValue={[
                        {
                          key: 'firstName',
                          name: 'First Name'
                        },
                        {
                          key: 'lastName',
                          name: 'Last Name'
                        },
                        {
                          key: 'email',
                          name: 'Email'
                        },
                        {
                          key: 'password',
                          name: 'Password'
                        },
                        {
                          key: 'category',
                          name: 'Category'
                        },
                        {
                          key: 'courses',
                          name: 'Courses'
                        },
                        {
                          key: 'date',
                          name: 'Date Of Birth'
                        },
                        {
                          key: 'contact',
                          name: 'Contact'
                        },
                        {
                          key: 'cnic',
                          name: 'CNIC'
                        },
                      ]}
                    />
                  )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default RegisterStd