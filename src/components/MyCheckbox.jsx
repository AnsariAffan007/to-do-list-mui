import React from 'react'
import Checkbox from '@mui/material/Checkbox';

const MyCheckbox = ({ size = 'small', checked = false, listId, listIndex }) => {

  return (
    <Checkbox
      size={size}
      checked={checked}
      sx={{
        color: 'primary.extraLight',
        '&.Mui-checked': {
          color: 'primary.extraLight',
        },
      }}
    />
  )
}

export default MyCheckbox