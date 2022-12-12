import { Box, Checkbox, CircularProgress, FormControlLabel, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MuiButton } from '../../../components/button/button'
import CusDataTable from '../../../components/CusDataTable/CusDataTable'
import MuiDataTable from '../../../components/CusDataTable/MuiDataTable'
import { FloatingSelect } from '../../../components/Dropdown/Dropdown'
import { FloatingInput } from '../../../components/input/input'
import { getData, pushData } from '../../../config/firebaseMethods'

const TrainerReg = () => {

    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [formSubmit, setFormSubmit] = useState(false)
    const [existedCourse, setCourse] = useState([])
    const [formCheck, setFormCheck] = useState(false)

    const handleChange = (key, value) => {
        const newField = { [key]: value }
        setData({ ...data, ...newField })
    }

    const submitData = () => {
        console.log(data);
        setFormSubmit(true)
        alert('Do you want to Submit?')
        return pushData(data, 'RegTrainer/')
            .then((res) => {
                setFormSubmit(false)
            })
            .catch((err) => {
                setFormSubmit(false)
                console.log(err);
            })
    }

    const getRegTrainer = () => {
        return getData('RegTrainer/')
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
        getRegTrainer()
    }, [])


    return (
        <>
            <Grid container justifyContent='center' minHeight="90vh">
                <Grid item xs={10} md={10}>
                    <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px' }}>
                        <Grid item md={10}>
                            <Typography variant="p" className="display-3">Trainer Form</Typography>
                            <Grid container className='mt-2' spacing={2}>
                                <Grid item xs={10} md={4}>
                                    <FloatingInput
                                        label='First Name'
                                        labelId='firstName-float'
                                        placeholder='First Name'
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        value={data.courseName}
                                    />
                                </Grid>
                                <Grid item xs={10} md={4}>
                                    <FloatingInput
                                        label='Last Name'
                                        labelId='lastName-float'
                                        placeholder='Last Name'
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        value={data.courseName}
                                    />
                                </Grid>
                                <Grid item xs={10} md={4}>
                                    <FloatingSelect
                                        label='Course Name'
                                        labelId='courseName-float'
                                        onChange={(e) => handleChange('courseAllowed', e.target.value)}
                                        required={true}
                                        nodeName='Courses'
                                        displayValue='courseName'
                                        fieldValue='courseName'
                                    />
                                </Grid>
                                <Grid item xs={10} md={6}>
                                    <FloatingInput
                                        label='Qualification'
                                        labelId='qualification-float'
                                        placeholder='Qualification'
                                        onChange={(e) => handleChange('qualification', e.target.value)}
                                        value={data.courseName}
                                    />
                                </Grid>
                                <Grid item xs={10} md={6}>
                                    <FloatingInput
                                        label='Other Qualification'
                                        labelId='otherQual-float'
                                        placeholder='Other Qualification'
                                        onChange={(e) => handleChange('otherQual', [e.target.value])}
                                        value={data.courseName}
                                    />
                                </Grid>
                                <Grid item xs={10} md={4}>
                                    <FloatingInput
                                        label='CNIC'
                                        labelId='cnic-float'
                                        placeholder='CNIC'
                                        onChange={(e) => handleChange('cnic', e.target.value)}
                                        value={data.courseName}
                                    />
                                </Grid>
                                <Grid item xs={10} md={4}>
                                    <FloatingInput
                                        label='Contact'
                                        labelId='contact-float'
                                        placeholder='Contact'
                                        onChange={(e) => handleChange('contact', e.target.value)}
                                        value={data.courseName}
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
                                                    key: 'firstName',
                                                    name: 'First Name'
                                                },
                                                {
                                                    key: 'lastName',
                                                    name: 'Last Name'
                                                },
                                                {
                                                    key: 'cnic',
                                                    name: 'CNIC'
                                                },
                                                {
                                                    key: 'qualification',
                                                    name: 'Qualification'
                                                },
                                                {
                                                    key: 'contact',
                                                    name: 'Contact'
                                                },
                                                {
                                                    key: 'courseAllowed',
                                                    name: 'Course Allowed'
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

export default TrainerReg