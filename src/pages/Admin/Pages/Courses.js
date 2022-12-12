import { Box, CircularProgress, FormControlLabel, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { MuiButton } from '../../../components/button/button'
import { FloatingInput, MuiInput } from '../../../components/input/input'
import { getData, pushData } from '../../../config/firebaseMethods'
import CusDataTable from '../../../components/CusDataTable/CusDataTable';
import MuiDataTable from '../../../components/CusDataTable/MuiDataTable';

function Course() {

  const [isLoading, setLoading] = useState(true)
  const [formSubmit, setFormSubmit] = useState(false)
  const [data, setData] = useState({})
  const [existedCourse, setCourse] = useState([])
  const [formCheck, setFormCheck] = useState(false)

  const handleChange = (e) => {
    let newField = { [e.target.name]: e.target.value }
    setData({ ...data, ...newField })
  }



  const submitData = () => {
    data.isFormOpen = formCheck.toString()
    setFormSubmit(true)
    alert('Do you want to Submit?')
    return pushData(data, 'Courses/')
      .then((res) => {
        setFormSubmit(false)
        setData({
          courseName: '',
          courseDuration: '',
          code: '',
          noOfQuiz: '',
          feeInRupees: '',
          leadTrainer: '',
          assistantTrainers: ''
        })
      })
      .catch((err) => {
        setFormSubmit(false)
        console.log(err);
      })
  }

  const getCourses = () => {
    return getData('Courses/')
      .then((res) => {
        setCourse(res);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      })
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <>
      <Grid container justifyContent='center' minHeight="100vh">
        <Grid item xs={10} md={10}>
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
            <Grid item md={10}>
              <Typography variant="p" className="display-3">Course Form</Typography>
              <Grid container className='mt-2' spacing={2}>
                <Grid item xs={10} md={4}>
                  <FloatingInput
                    label='Course Name'
                    labelId='courseName-float'
                    name='courseName'
                    placeholder='Course Name'
                    onChange={(e) => handleChange(e)}
                    value={data.courseName}
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <FloatingInput
                    label='Course Duration'
                    labelId='courseDuration-float'
                    name='courseDuration'
                    placeholder='Course Duration'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <FloatingInput
                    label='Course Code'
                    labelId='courseCode-float'
                    name='code'
                    placeholder='Course Code'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <FloatingInput
                    label='No Of Quiz'
                    labelId='noOfQuiz-float'
                    name='noOfQuiz'
                    placeholder='No Of Quiz'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <FloatingInput
                    label='Fee In Rupees'
                    labelId='feeInRupees-float'
                    name='feeInRupees'
                    placeholder='Fee In Rupees'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <FloatingInput
                    label='Lead Trainer'
                    labelId='leadTrainer-float'
                    name='leadTrainer'
                    placeholder='Lead Trainer'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <FloatingInput
                    label='Assistant Trainers'
                    labelId='assistantTrainers-float'
                    name='assistantTrainers'
                    placeholder='Assistant Trainers'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Is Form Open"
                    name='isFormOpen'
                    onChange={(e) => setFormCheck(e.target.checked)}
                  />
                </Grid>
                <Grid item md={12}>
                  {formSubmit ? (
                    <CircularProgress />
                  ) : (
                    <MuiButton
                      color="custom"
                      label='Submit'
                      onClick={submitData}
                    />
                  )}
                </Grid>
                <Grid item md={12}>
                  <Typography variant="p" className="display-4">Course List</Typography>
                  {isLoading ? (
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <MuiDataTable
                      dataSource={existedCourse}
                      colValue={[
                        {
                          key: 'courseName',
                          name: 'Course Name'
                        },
                        {
                          key: 'courseDuration',
                          name: 'Course Duration'
                        },
                        {
                          key: 'isFormOpen',
                          name: 'Is Form Open'
                        },
                        {
                          key: 'noOfQuiz',
                          name: 'No of Quiz'
                        },
                        {
                          key: 'feeInRupees',
                          name: 'Fee in Rupee'
                        },
                        {
                          key: 'leadTrainer',
                          name: 'Lead Trainer'
                        },
                        {
                          key: 'assistantTrainers',
                          name: 'Assistant Trainer'
                        },
                      ]}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid >
    </>
  )
}

export default Course