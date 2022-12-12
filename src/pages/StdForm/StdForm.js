import { CircularProgress, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MuiCustomizedButtons from '../../components/button/MuiCustomButtom'
import { MuiSelect } from '../../components/Dropdown/Dropdown'
import { MuiDatepicker, MuiInput, MuiPasswordField } from '../../components/input/input'
import MuiModal from '../../components/Modal/Modal'
import { SetDate } from '../../config/core/helperMethod'
import { handleSignup, handleStdSignup } from '../../config/firebaseMethods'
import './StdForm.css'

function StdForm() {

    const [data, setData] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)

    const handleChange = (e) => {
        let newField = { [e.target.name]: e.target.value }
        setData({ ...data, ...newField })
    }

    const submitData = () => {
        data.registrationDate = SetDate(new Date());
        data.isFeeSubmitted = false;
        data.isApproved = false;
        data.isActive = false;
        data.category = 'student';
        setLoading(true)
        alert('Do you want to Submit?')
        return handleStdSignup(data, 'Students')
            .then((success) => {
                setModal(true)
                setLoading(false)
                console.log(success);
            })
            .catch((error) => {
                setError(true)
                setLoading(false)
                console.log(error);
            })
    }

    return (
        <>
            {!modal ? (
                <Grid container justifyContent='center' alignItems='center' minHeight="103.2vh" spacing={3} sx={{ backgroundColor: '#eee' }}>
                    <Grid item xs={10} md={9}>
                        <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: '5px', boxShadow: "0px 0px 10px -1px rgba(0,0,0,0.5)" }}>
                            <Box className=' mb-3'>
                                <Typography variant='h4'>Student Registration Form</Typography>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={6}>
                                    <MuiInput
                                        label='First Name'
                                        name='firstName'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={6} xs={6}>
                                    <MuiInput
                                        label='Last Name'
                                        name='lastName'
                                        onChange={(e) => handleChange(e)}
                                        required={false}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={6} xs={6}>
                                    <MuiInput
                                        label='Email'
                                        name='email'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={6} xs={6}>
                                    <MuiPasswordField
                                        label="Password"
                                        labelId="password-outlined"
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                        name='password'
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MuiDatepicker
                                        label='Date of Birth'
                                        type="date"
                                        name='date'
                                        onChange={(e) => handleChange(e)}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <MuiInput
                                        label='Contact'
                                        name='contact'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <MuiInput
                                        label='CNIC'
                                        name='cnic'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <MuiSelect
                                        label='Courses'
                                        labelId='courses-label'
                                        name='courses'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                        nodeName='Courses'
                                        displayValue='courseName'
                                        fieldValue='code'
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <MuiSelect
                                        label='Section'
                                        labelId='section-label'
                                        name='section'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                        dataSource={[
                                            {
                                                code: 'a',
                                                option: 'A'
                                            },
                                            {
                                                code: 'b',
                                                option: 'B'
                                            },
                                            {
                                                code: 'c',
                                                option: 'C'
                                            },
                                        ]}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MuiInput
                                        label='Father Name'
                                        name='fatherName'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <MuiInput
                                        label='Father Contact'
                                        name='fatherContact'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <MuiInput
                                        label='Father CNIC'
                                        name='fatherCnic'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <MuiInput
                                        label='Emergency Contact'
                                        name='emergencyContact'
                                        onChange={(e) => handleChange(e)}
                                        required={true}
                                        error={error}
                                    />
                                </Grid>
                                <Grid item md={8}></Grid>
                                <Grid item md={12} xs={12} textAlign='right'>
                                    {loading ? (
                                        <CircularProgress />
                                    ) : (
                                        <MuiCustomizedButtons
                                            label="Submit"
                                            className="px-5 mb-3"
                                            onClick={submitData}
                                        />
                                    )}
                                    <Typography variant='subtitle1'>Already Registered? <Link to='/login' style={{ color: 'grey' }}>Log in</Link></Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            ) : (
                <MuiModal
                    title='Thank you for submitting the Form.'
                    description='We will contact you later.'
                />
            )}
        </>
    )
}

export default StdForm