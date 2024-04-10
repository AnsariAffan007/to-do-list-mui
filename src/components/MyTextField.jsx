import React, { useEffect, useState } from 'react'
import { TextField, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'

const MyTextField = ({ inputRegister, setValue, errors, clearError }) => {

  const [inputVal, setInputVal] = useState(false);
  useEffect(() => {
    (inputRegister.value === "") && setInputVal(false);
  }, [inputRegister.value])
  const handleChange = (e) => {
    if (e.target.value.length === 0) setInputVal(false);
    else if (e.target.value.length === 1) !inputVal && setInputVal(true);
    setValue("new-list-item", e.target.value);
  }
  return (
    <>
      <TextField
        hiddenLabel
        id="list-item-input"
        label="Add List Item"
        variant="filled"
        autoComplete='off'
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
        sx={{
          bgcolor: 'primary.light',
          borderRadius: 2,
          p: '0 15px',
          label: {
            color: teal[200],
            display: inputVal ? 'none' : 'block',
            p: '0 15px',
            '&.Mui-focused': {
              display: 'none',
            }
          },
          '.MuiInputBase-root': {
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'transparent'
            },
            '&.Mui-focused': {
              bgcolor: 'transparent',
            }
          },
          input: {
            color: 'primary.light50',
            height: '100%'
          },
        }}
        {...inputRegister}
        onChange={handleChange}
      />
      <Typography
        variant="body2"
        fontWeight={100}
        p={"5px 25px"}
        fontSize="0.75rem"
        color="secondary">
        {!inputVal && errors?.message}
      </Typography>
    </>
  )
}

export default MyTextField