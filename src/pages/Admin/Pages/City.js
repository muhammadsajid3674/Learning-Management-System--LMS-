import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MuiButton } from '../../../components/button/button'
import CusDataTable from '../../../components/CusDataTable/CusDataTable'
import MuiDataTable from '../../../components/CusDataTable/MuiDataTable'
import { FloatingSelect, MuiSelect } from '../../../components/Dropdown/Dropdown'
import { FloatingInput } from '../../../components/input/input'
import { getData, pushData } from '../../../config/firebaseMethods'

function Cities() {
  const [data, setData] = useState({})
  const [existedCities, setCity] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [formSubmit, setFormSubmit] = useState(false)

  const handleChange = (e) => {
    let newField = { [e.target.name]: e.target.value }
    setData({ ...data, ...newField })
  }



  const submitData = () => {
    setFormSubmit(true)
    alert('Do you want to Submit?')
    return pushData(data, 'Cities/')
      .then((res) => {
        setFormSubmit(false)
      })
      .catch((err) => {
        setFormSubmit(false)
        console.log(err);
      })
  }

  const getCountries = () => {
    return getData('Cities/')
      .then((res) => {
        setCity(res);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      })
  }

  useEffect(() => {
    getCountries()
  }, [])


  return (
    <>
      <Grid container justifyContent='center' minHeight="100vh">
        <Grid item xs={10} md={10}>
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
            <Grid item md={10}>
              <Typography variant="p" className="display-3">City Form</Typography>
              <Grid container className='mt-2' spacing={2}>
                <Grid item xs={10} md={4}>
                  <FloatingSelect
                    label='County'
                    labelId='country-label'
                    name='country'
                    onChange={(e) => handleChange(e)}
                    nodeName='Country'
                    displayValue='country'
                    fieldValue='country'
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <FloatingInput
                    label='City'
                    labelId='city-float'
                    name='city'
                    placeholder='City'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <FloatingInput
                    label='City Code'
                    labelId='cityCode-float'
                    name='cityCode'
                    placeholder='City Code'
                    onChange={(e) => handleChange(e)}
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
                <Grid item xs={12} md={12}>
                  <Typography variant="p" className="display-4">Cities List</Typography>
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
                      dataSource={existedCities}
                      colValue={[
                        {
                          key: 'country',
                          name: 'Country'
                        },
                        {
                          key: 'city',
                          name: 'City'
                        },
                        {
                          key: 'cityCode',
                          name: 'City Code'
                        },

                      ]}
                    />
                  )}
                </Grid>
              </Grid >
            </Grid>
          </Box>
        </Grid>
      </Grid ></>
  )
}

export default Cities