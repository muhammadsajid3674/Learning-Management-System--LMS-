import { Switch } from '@mui/material'
import React from 'react'

function MuiSwitch(props) {

    const {label, onChange, value} = props

  return (
    <>
    <Switch label={label} onChange={onChange} value={value}/>
    </>
  )
}

export default MuiSwitch