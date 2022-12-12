import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import './input.css';

const theme = createTheme({
    palette: {
        custom: {
            light: '#0c4b74',
            main: '#0c4b74',
            dark: '#0c4b74',
            contrastText: '#fff',
        }
    },
});

function DefaultInput(props) {
    const { label, onChange, disabled, required, min, max, type, value, placeholder } = props;

    return <>
        <input type={type} class="form-control customInput" id="floatingInput" placeholder={label} value={value} onChange={onChange} disabled={disabled} />
    </>
};

function FloatingInput(props) {
    const { label, labelId, onChange, name, helperText, disabled, required, min, max, type, value, placeholder } = props;

    return <>
        <div className="form-floating">
            <input type={type} className="form-control customInput" name={name} id={labelId} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} />
            <label htmlFor={labelId}>{label}</label>
        </div>
    </>
};

function MuiInput(props) {
    const { label, variant, onChange, name, helperText, error, color, margin, disabled, required, min, max, type, value, placeholder } = props;
    return <>
        <ThemeProvider theme={theme}>
            <TextField
                variant={variant ?? 'standard'}
                color={color ?? 'custom'}
                fullWidth
                label={label}
                onChange={onChange}
                name={name}
                helperText={helperText}
                disabled={false}
                required={required}
                error={error}
                margin={margin}
            />
        </ThemeProvider>
    </>

}

function MuiDatepicker(props) {
    const { label, variant, onChange, name, id, color, helperText, error, disabled, required, min, max, type, value, placeholder } = props;
    return <>
        <ThemeProvider theme={theme}>
            <TextField
                variant={variant ?? 'standard'}
                color={color ?? 'custom'}
                fullWidth
                name={name}
                id={id}
                label={label}
                error={error}
                type={type}
                defaultValue="YY-MM-DD"
                onChange={onChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </ThemeProvider>
    </>
}

function MuiPasswordField(props) {

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

    const { label, labelId, variant, onChange, name, color, id, helperText, error, disabled, required, min, max, type, value, placeholder } = props;

    return <ThemeProvider theme={theme}>
        <FormControl fullWidth required={required} variant={variant ?? 'standard'} color={color ?? 'custom'} error={error}>
            <InputLabel htmlFor={labelId}>{label}</InputLabel>
            {variant ? (
                <FilledInput
                    id={labelId}
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    name={name}
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
                    label={label}
                ></FilledInput>
            ) : (
                <Input
                    id={labelId}
                    type={values.showPassword ? 'text' : 'password'}
                    onChange={onChange}
                    name={name}
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
                    label={label}
                ></Input>
            )
            }
        </FormControl >
    </ThemeProvider>
}

export { DefaultInput, FloatingInput, MuiInput, MuiDatepicker, MuiPasswordField };