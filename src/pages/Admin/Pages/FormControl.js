import { Box, Checkbox, CircularProgress, FormControlLabel, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MuiButton } from '../../../components/button/button'
import CusDataTable from '../../../components/CusDataTable/CusDataTable'
import MuiDataTable from '../../../components/CusDataTable/MuiDataTable'
import { FloatingSelect } from '../../../components/Dropdown/Dropdown'
import { MuiDatepicker } from '../../../components/input/input'
import { getData, pushData } from '../../../config/firebaseMethods'

const FormControl = () => {

  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [formSubmit, setFormSubmit] = useState(false)
  const [formCheck, setFormCheck] = useState(false)
  const [ExistedFormControl, setFormControl] = useState([])

  const handleChange = (key, value) => {
    const newField = { [key]: value }
    setData({ ...data, ...newField })
  }

  const submitData = () => {
    data.isFormOpen = formCheck.toString()
    setFormSubmit(true)
    alert('Do you want to Submit?')
    return pushData(data, 'FormControl/')
      .then((res) => {
        setFormSubmit(false)
      })
      .catch((err) => {
        setFormSubmit(false)
        console.log(err);
      })
  }

  const getRegTrainer = () => {
    return getData('FormControl/')
      .then((res) => {
        setFormControl(res);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      })
  }

  useEffect(() => {
    getRegTrainer()
  }, [])


  return (
    <>
      <Grid container justifyContent='center' minHeight="90vh">
        <Grid item xs={10} md={10}>
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
            <Grid item md={10}>
              <Typography variant="p" className="display-3">Course Form</Typography>
              <Grid container className='mt-2' spacing={2}>
                <Grid item xs={10} md={6}>
                  <FloatingSelect
                    label='Open in Cities'
                    labelId='openInCities-float'
                    onChange={(e) => handleChange('openInCities', e.target.value)}
                    required={true}
                    nodeName='Cities'
                    displayValue='city'
                    fieldValue='city'
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <FloatingSelect
                    label='Course Name'
                    labelId='courseName-float'
                    onChange={(e) => handleChange('courseName', e.target.value)}
                    required={true}
                    nodeName='Courses'
                    displayValue='courseName'
                    fieldValue='courseName'
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <MuiDatepicker
                    label='Date Of Admission Start'
                    type="date"
                    onChange={(e) => handleChange('dateOfAdmissionStart', e.target.value)}
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <MuiDatepicker
                    label='Date Of Admission End'
                    type="date"
                    onChange={(e) => handleChange('dateOfAdmissionEnd', e.target.value)}
                  />
                </Grid>
                <Grid item xs={10} md={8}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Is Form Open"
                    onChange={(e) => setFormCheck('isFormOpen' ,e.target.checked)}
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
                          dataSource={ExistedFormControl}
                          colValue={[
                            {
                              key: 'openInCities',
                              name: 'Open In Cities'
                            },
                            {
                              key: 'courseName',
                              name: 'Course Name'
                            },
                            {
                              key: 'dateOfAdmissionStart',
                              name: 'Date Of Adm Start'
                            },
                            {
                              key: 'dateOfAdmissionEnd',
                              name: 'Date Of Adm End'
                            },
                            {
                              key: 'isFormOpen',
                              name: 'Is Form Open'
                            }
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

export default FormControl