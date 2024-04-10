import React, { createContext, useRef, useState } from 'react'
import { ThemeProvider } from '@emotion/react';
import List from './components/List';
import { teal, deepOrange } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MySelectBox from './components/MySelectBox';
import MyTextField from './components/MyTextField';
import { useForm, Controller } from 'react-hook-form';

const defaultValues = {
  'new-list-item': "",
  'list-select': ""
}

const theme = createTheme({
  palette: {
    primary: {
      light50: teal[50],
      extraLight: teal[100],
      light: teal[800],
      main: teal[900],
      dark: teal[900]
    },
    secondary: {
      main: deepOrange[500],
      transparent100: 'rgba(255, 255, 255, 0.1)',
      transparent200: 'rgba(255, 255, 255, 0.2)',
    }
  }
})

export const AppContext = createContext();

const App = () => {

  let renderCount = useRef(0);
  renderCount.current++;

  const { control, setValue, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: defaultValues
  })

  const [personalList, setPersonalList] = useState([])
  const [workList, setWorkList] = useState([])
  const [academicList, setAcademicList] = useState([])

  const deleteFinished = (listId) => {
    if (listId === 0) setPersonalList(prev => prev.filter(obj => !obj.listChecked))
    if (listId === 1) setWorkList(prev => prev.filter(obj => !obj.listChecked))
    if (listId === 2) setAcademicList(prev => prev.filter(obj => !obj.listChecked))
  }

  const setCheck = (prev, listIndex) => {
    return prev.map((obj, index) => {
      if (listIndex === index) return { ...obj, listChecked: !prev[index].listChecked }
      else return obj
    })
  }
  // const setAllChecked = (prev) => {
  //   return prev.map((obj, index) => {
  //     return { ...obj, listChecked: true }
  //   })
  // }
  const changeCheck = (id, listIndex) => {
    // if (listIndex === -1) {
    //   if (id === 0) setPersonalList(prev => setAllChecked(prev))
    //   else if (id === 1) setWorkList(prev => setAllChecked(prev))
    //   else if (id === 2) setAcademicList(prev => setAllChecked(prev))
    // }
    if (id === 0) setPersonalList(prev => setCheck(prev, listIndex));
    else if (id === 1) setWorkList(prev => setCheck(prev, listIndex));
    else if (id === 2) setAcademicList(prev => setCheck(prev, listIndex));
  }

  const onSubmit = (data, e) => {
    if (data['list-select'] === 0) setPersonalList((prev) => ([...prev, {
      listItem: data['new-list-item'],
      listChecked: false
    }]))
    else if (data['list-select'] === 1) setWorkList((prev) => ([...prev, {
      listItem: data['new-list-item'],
      listChecked: false
    }]))
    else if (data['list-select'] === 2) setAcademicList((prev) => ([...prev, {
      listItem: data['new-list-item'],
      listChecked: false
    }]))
    reset(defaultValues)
  }

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={changeCheck}>
        <Box height='100vh'>
          <Box
            component="section"
            p='0 6%'
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height='12vh'
            sx={{
              bgcolor: 'primary.main',
            }}
          >
            <Typography variant="h5" fontWeight={700} color="primary.light50">Work Shelf</Typography>
            <Typography variant='span' color="primary.light50">Render Count: {renderCount.current}</Typography>
          </Box>

          <Box
            component="section"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // gap={1}
            p={'0 5%'}
            height='70vh'
            sx={{
              bgcolor: 'primary.main',
            }}
          >

            <List
              name="Personal"
              listId={0}
              list={personalList}
              changeCheck={changeCheck}
              deleteFinished={deleteFinished}
            />
            <List
              name="Work"
              listId={1}
              list={workList}
              changeCheck={changeCheck}
              deleteFinished={deleteFinished}
            />
            <List
              name="Academic"
              listId={2}
              list={academicList}
              changeCheck={changeCheck}
              deleteFinished={deleteFinished}
            />

          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              component="section"
              height="18vh"
              display='flex'
              // justifyContent='center'
              gap="20px"
              alignItems='center'
              p={'0 5%'}
              sx={{
                bgcolor: 'primary.main',
              }}
            >
              <Box height="3.2rem" width="60%">
                <Controller
                  name='new-list-item'
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <MyTextField
                      inputRegister={field}
                      setValue={setValue}
                      errors={errors['new-list-item']}
                    />
                  )}
                />
              </Box>

              <Box height="3.2rem" width="30%">
                <Controller
                  name='list-select'
                  control={control}
                  rules={{ required: "Please select a List" }}
                  render={({ field }) => (
                    <MySelectBox
                      inputFields={field}
                      setValue={setValue}
                      errors={errors['list-select']} />
                  )}
                />
              </Box>

              <Box height="3.2rem" width="10%">
                <Button
                  variant="contained"
                  size='large'
                  disableElevation
                  endIcon={<AddIcon />}
                  fullWidth
                  sx={{
                    height: "100%",
                    color: 'primary.light50',
                    bgcolor: 'primary.light',
                    '&:hover': {
                      bgcolor: 'primary.light'
                    },
                    borderRadius: '10px',
                    textTransform: 'none',
                  }}
                  type='submit'
                >
                  Add
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </AppContext.Provider>
    </ThemeProvider>
  )
}

export default App