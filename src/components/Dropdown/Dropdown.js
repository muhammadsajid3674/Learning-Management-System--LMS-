import { ContactSupportOutlined } from '@mui/icons-material';
import { createTheme, FormControl, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getData } from '../../config/firebaseMethods';

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

function MuiSelect(props) {

    const { label, onChange, value, variant, color, name, error, fullWidth, id, labelId, nodeName, dataSource, required, displayValue, fieldValue } = props

    const [dataBaseSource, setDataBaseSource] = useState(dataSource)

    const selectValueDb = () => {
        if (nodeName) {
            return getData(nodeName)
                .then((res) => {
                    setDataBaseSource(res)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        selectValueDb()
    }, [])



    return (
        <>
            <ThemeProvider theme={theme}>
                <FormControl fullWidth required={required} color={color ?? 'custom'} variant={variant ?? 'standard'}>
                    <InputLabel id={labelId}>{label}</InputLabel>
                    <Select
                        variant={variant ?? 'standard'}
                        color={color ?? 'custom'}
                        labelId={labelId}
                        id={id}
                        label={label}
                        onChange={onChange}
                        name={name}
                        error={error}>
                        {dataBaseSource && dataBaseSource.length > 0 ? dataBaseSource.map((e, i) => {
                            return <MenuItem key={i} value={e[fieldValue ? fieldValue : 'code']}>
                                {e[displayValue ? displayValue : 'option']}
                            </MenuItem>
                        }) : null}
                    </Select>
                </FormControl>
            </ThemeProvider>
        </>
    )
}

function FloatingSelect(props) {

    const { label, onChange, disabled, value, variant, color, name, error, fullWidth, id, labelId, nodeName, dataSource, required, displayValue, fieldValue } = props

    const [dataBaseSource, setDataBaseSource] = useState(dataSource)

    const selectValueDb = () => {
        if (nodeName) {
            return getData(nodeName)
                .then((res) => {
                    setDataBaseSource(res)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        selectValueDb()
    }, [])


    return <div className="form-floating">
        <select className="form-select" id={labelId} onChange={onChange} name={name} disabled={disabled} aria-label="Floating label select example">
            <option defaultValue>Choose..</option>
            {dataBaseSource && dataBaseSource.length > 0 ? dataBaseSource.map((e, i) => {
                return <option key={i} value={e[fieldValue ? fieldValue : 'option']}>
                    {e[displayValue ? displayValue : 'option']}
                </option>
            }) : null}
        </select>
        <label htmlFor={labelId}>{label}</label>
    </div>
}

export { MuiSelect, FloatingSelect }