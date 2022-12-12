import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MuiButton } from '../../../components/button/button'
import CusDataTable from '../../../components/CusDataTable/CusDataTable'
import MuiDataTable from '../../../components/CusDataTable/MuiDataTable'
import { FloatingInput } from '../../../components/input/input'
import { getData, pushData } from '../../../config/firebaseMethods'

function Countries() {

  const [data, setData] = useState({})
  const [existedCountry, setCountry] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [formSubmit, setFormSubmit] = useState(false)

  const handleChange = (e) => {
    let newField = { [e.target.name]: e.target.value }
    setData({ ...data, ...newField })
  }



  const submitData = () => {
    setFormSubmit(true)
    alert('Do you want to Submit?')
    return pushData(data, 'Country/')
      .then((res) => {
        setFormSubmit(false)
      })
      .catch((err) => {
        setFormSubmit(false)
        console.log(err);
      })
  }

  const getCountries = () => {
    return getData('Country/')
      .then((res) => {
        setCountry(res);
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
              <Typography variant="p" className="display-3">Country Form</Typography>
              <Grid container className='mt-2' spacing={2}>
                <Grid item xs={10} md={4}>
                  <FloatingInput
                    label='Country'
                    labelId='country-float'
                    name='country'
                    placeholder='Country '
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <FloatingInput
                    label='Country Code'
                    labelId='countryCode-float'
                    name='countryCode'
                    placeholder='Country Code'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={10} md={4}>
                  <FloatingInput
                    label='Currency'
                    labelId='currency-float'
                    name='currency'
                    placeholder='Currency'
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
                  <Typography variant="p" className="display-4">Country List</Typography>
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
                      dataSource={existedCountry}
                      colValue={[
                        {
                          key: 'country',
                          name: 'Country'
                        },
                        {
                          key: 'countryCode',
                          name: 'Country Code'
                        },
                        {
                          key: 'currency',
                          name: 'Currency'
                        },
                      ]}
                    />
                  )}
                </Grid>
              </Grid >
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Countries