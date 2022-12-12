import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleSignup } from '../../config/firebaseMethods'

function Signup() {

    const [isLoading, setLoading] = useState(false)
    // fields data push
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [category, setCategory] = useState("admin")
    const [error, setError] = useState(false)
    // const [helperText, setHelperText] = useState("")

    const handleSubmit = () => {
        setLoading(true)
        //Firebase Auth
        handleSignup({ email, password, name, category }, 'Students')
            .then((success) => {
                setLoading(false)
                console.log(success);
            })
            .catch((error) => {
                setError(true)
                setLoading(false)
                console.log(error);
            })
    }

    // Password Field
    const [values, setValues] = useState({
        showPassword: false
    })
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };
    // Password Field

    return (
        <>
            <Box sx={{ backgroundColor: '#e76f51', minHeight: '100vh' }}>
                <Box className='text-center py-3'>
                    <Typography variant='p' className='display-3 text-white'>Welcome to ToDo App</Typography>
                </Box>
                <Grid container justifyContent='center' alignItems='center' height='80vh'>
                    <Grid item md={4} xs={10}>
                        <Box sx={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.5)', p: 5, borderRadius: '10px', backgroundColor: '#fff' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box className='d-flex justify-content-center align-items-center text-center mb-2'>
                                    <Typography variant='h4' className='text-center'>Signup</Typography>
                                </Box>
                                {/* <FormControl sx={{ m: 1 }} variant='outlined'>
                                    <InputLabel htmlFor='outlined-name'>Name</InputLabel>
                                    <OutlinedInput
                                        id='outlined-name'
                                        type='text'
                                        onChange={(event) => handleChange(event)}
                                        label='Name'
                                        name="name"
                                    ></OutlinedInput>
                                </FormControl> */}
                                <TextField
                                    margin='dense'
                                    id="outlined-name"
                                    label="Username"
                                    variant="outlined"
                                    type='text'
                                    onChange={(e) => setName(e.target.value)}
                                    name="name"
                                    fullWidth
                                    required
                                    error={error}
                                />
                                <TextField
                                    margin='dense'
                                    id="outlined-email"
                                    label="Email"
                                    variant="outlined"
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    fullWidth
                                    required
                                    error={error}
                                />
                                <FormControl
                                    margin='dense'
                                    variant='outlined'
                                    fullWidth
                                    required
                                    error={error}
                                >
                                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                                    <OutlinedInput
                                        id='outlined-adornment-password'
                                        type={values.showPassword ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        endAdornment={
                                            <InputAdornment position='end'>
                                                <IconButton
                                                    aria-label='toggle password visibility'
                                                    onClick={handleClickShowPassword}
                                                    edge='end'
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label='Password'

                                    ></OutlinedInput>
                                </FormControl>
                            </Box>
                            <Box sx={{
                                textAlign: 'center',
                                mb: 2
                            }}>
                                {isLoading ? <CircularProgress /> :
                                    <Button variant='contained'
                                        onClick={handleSubmit}
                                        sx={{
                                            backgroundColor: '#1d3557',
                                            mt: 1,
                                            '&:hover': {
                                                backgroundColor: '#457b9d'
                                            }
                                        }}>Submit</Button>
                                }
                            </Box>
                            <Typography variant='subtitle1' className='text-center'>I have an account. <Link to='/login'>Log In</Link></Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Signup