import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material'
import { teal } from '@mui/material/colors'

const MySelectBox = ({ inputFields, setValue, errors }) => {

  const [isValue, setIsValue] = useState(false);
  useEffect(() => {
    (inputFields.value === "") && setIsValue(false)
  }, [inputFields.value])
  const handleSelectChange = (e) => {
    setIsValue(true);
    setValue("list-select", e.target.value)
  }

  return (
    <FormControl
      fullWidth
      sx={{
        "&.MuiFormControl-root": {
          height: '100%'
        },
        '& .MuiInputBase-root': {
          height: '100%'
        }
      }}
    >
      <InputLabel
        shrink={false}
        sx={{
          display: isValue ? "none" : "block",
          p: '0 15px',
          color: teal[200],
          '&.Mui-focused': {
            color: teal[200]
          }
        }}
      >
        List
      </InputLabel>
      <Select
        hiddenLabel
        disableUnderline
        fullWidth
        id="list-select"
        label="Select list"
        variant="filled"
        MenuProps={{
          anchorOrigin: {
            vertical: 'center',
            horizontal: 'left'
          }
        }}
        sx={{
          color: 'primary.light50',
          bgcolor: 'primary.light',
          p: '0 15px',
          borderRadius: 2,
          '&.Mui-focused': {
            bgcolor: 'primary.light',
          },
          '&:hover': {
            bgcolor: 'primary.light'
          },
          '.MuiSvgIcon-root': {
            paddingInlineEnd: '15px',
            fill: "#b2dfdb",
            width: '1.5em'
          },
          '.MuiSelect-iconOpen': {
            p: '0 0 0 15px'
          }
        }}
        {...inputFields}
        onChange={handleSelectChange}
      >
        <MenuItem value={0}>Personal</MenuItem>
        <MenuItem value={1}>Work</MenuItem>
        <MenuItem value={2}>Academic</MenuItem>
      </Select>
      <FormHelperText sx={{ color: "secondary.main" }}>{errors?.message}</FormHelperText>
    </FormControl>
  )
}

export default MySelectBox