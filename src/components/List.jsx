import React, { useRef, useState } from 'react'
import { Box, Typography, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import MyCheckbox from './MyCheckbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const List = ({ name, listId, list, changeCheck, deleteFinished }) => {

  const deleteBoxRef = useRef();
  const handleMouseEnter = (e) => {
    deleteBoxRef.current.style.transform = "translate(0, 0)"
  }
  const handleMouseLeave = (e) => {
    deleteBoxRef.current.style.transform = "translate(0, 100%)"
  }

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClose = () => {
    deleteBoxRef.current.style.transform = "translate(0, 100%)"
    setDialogOpen(false);
  }
  const confirmDelete = () => {
    deleteFinished(listId);
    setDialogOpen(false);
    deleteBoxRef.current.style.transform = "translate(0, 100%)"
  }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      component="div"
      height="100%"
      width="32%"
      sx={{
        bgcolor: 'primary.light',
        borderRadius: 2
      }}
      position="relative"
      overflow="hidden"
    >
      <Box
        p={"1rem"}
        borderBottom="1px solid"
        borderColor="secondary.transparent100"
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{
          cursor: "pointer",
          transition: "background-color ease-in-out 250ms",
          ":hover": {
            bgcolor: "secondary.transparent100"
          }
        }}
        // onClick={() => changeCheck(listId, -1)}
      >
        <Typography variant="span" fontSize={"1.2rem"} color="white">{name}</Typography>
        {/* <MyCheckbox size="medium" checked={false} listIndex={-1} /> */}
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        height="75%"
        overflow="auto"
        sx={{
          '&::-webkit-scrollbar': {
            width: '0.5em'
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'secondary.transparent200',
            borderRadius: '20px'
          }
        }}
      >
        {list.map((listObj, index) => {
          return (
            <Box
              key={index}
              p="0.5rem 1rem"
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                cursor: "pointer",
                transition: "background-color ease-in-out 250ms",
                ":hover": {
                  bgcolor: "secondary.transparent100"
                }
              }}
              onClick={() => changeCheck(listId, index)}
            >
              <Typography
                variant='p'
                fontSize={"1rem"}
                fontWeight={100}
                color={'primary.light50'}
                sx={{ textDecoration: listObj.listChecked && 'line-through' }}
              >
                {listObj.listItem}
              </Typography>
              <MyCheckbox checked={listObj.listChecked} listId={listId} listIndex={index} />
            </Box>
          )
        })}
      </Box>

      <Button
        ref={deleteBoxRef}
        fullWidth
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "15px",
          paddingInlineEnd: "22px",
          position: "absolute",
          bottom: 0,
          transform: "translate(0, 100%)",
          bgcolor: "secondary.transparent100",
          transition: "all ease-in-out 300ms",
          ":hover": {
            bgcolor: "secondary.transparent200",
          },
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          cursor: "pointer",
          textTransform: 'none',
        }}
        disableRipple
        onClick={() => setDialogOpen(true)}
      >
        <Typography variant='subtitle2' color="secondary.main" fontSize="1.05rem" sx={{ lineHeight: 0 }}>
          Delete Finished Tasks
        </Typography>
        <DeleteOutlineIcon
          sx={{
            color: 'secondary.main',
            margin: "auto 0",
            transition: "all ease-in-out 250ms",
          }}
        />
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
      >
        <DialogContent id="alert-dialog-title">
          Delete finished tasks from {name} list ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={confirmDelete} autoFocus color='secondary'>Yes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default List