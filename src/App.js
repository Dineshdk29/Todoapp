import {
 Card,
 CardActions,
CardContent,
Button,
Typography,
Container,
AppBar,
Toolbar,
TextField,
CardHeader,
Stack,
List,
ListItem,
ListItemText,
DialogTitle,
Dialog,
IconButton, 
}from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DialogActions, DialogContent } from '@mui/material';




function App() {

  const _date = new Date();

  const [value, setValues] = useState({
    title: '',
    description: '',
  });
  const [editValue, setEditValues] = useState({
    id: '',
    title: '',
    description: '',
  });


  const [arr, setArr] = useState([]);

  const [count, setCount] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);



  const handleChange = (event) => {
    setValues({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditChange = (event) => {
     setEditValues({
      ...editValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdd = e => {
    e.preventDefault(); 

    if(value.title && value.description){
      let temp = [...arr];
    let obj = {
      id: count,
      title: value.title,
      description: value.description,
    };
    temp.push(obj);
    setCount(count + 1);
    setArr(temp);
    setValues({
      title: '',
      description: '',
    });
  }else {
    alert('Not Valid');
  }
    
  };

  const compareFnc = (obj1, obj2) => {
    return obj2.id - obj1.id;
  };

  const handleDelete = (todo) => {
    let temp = [...arr];
    let index = temp.findIndex((_x) => _x.id === todo.id);
    temp.splice(index, 1);
    setArr(temp);
  };

  const handleView = (todo) => {
    setEditValues({...todo})
    setOpenDialog(true);

  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }
  const handleUpdate = e => {
    e.preventDefault();
    if(editValue.title && editValue.description){
      let temp = [...arr];
    let obj = {
      id: editValue.id,
      title:editValue.title,
      description: editValue.description,
    };
    let index = temp.findIndex(_x => _x.id === editValue.id)
    temp.splice(index, 1)
    temp.push(obj);
    setArr(temp);
    setOpenDialog(false);
    }else{
      alert('Not valid');
    }
 };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm'>
        <Stack spacing={2}>
          <Card sx={{ minWidth: 275, marginTop: 10 }}>
            <form onSubmit={handleAdd}>
            <CardHeader title='Create a todo' subheader={`${_date}`} />
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label='Title'
                  id='title-id'
                  placeholder='Enter a title'
                  size='small'
                  fullWidth
                  autoFocus
                  name='title'
                  value={value.title}
                  onChange={handleChange}
                />

                <TextField
                  label='Description'
                  id='title-id'
                  placeholder='Enter a description'
                  size='small'
                  fullWidth
                  name='description'
                  value={value.description}
                  onChange={handleChange}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                size='small'
                variant='contained'
                fullWidth
                type='submit'
              >
                Add
              </Button>
            </CardActions>
            </form>
          </Card>

          <Card>
            <CardContent>
              <List>
              {arr.length === 0 && <span>Empty</span>}
                {arr.sort(compareFnc).map((todo) => (
                  <ListItem
                    key={todo.id}
                    secondaryAction={
                      <>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleDelete(todo)}
                      >
                        <DeleteIcon />
                      </IconButton> {' '}
                       <IconButton
                       edge='end'
                       aria-label='view'
                       onClick={() => handleView(todo)}
                     >
                       <RemoveRedEyeIcon />
                     </IconButton>
                     </>
                    }
                  >
                    <ListItemText
                      primary={todo.title}
                      secondary={todo.description}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Stack>
      </Container>
      <Dialog onClose={handleCloseDialog} open={openDialog} maxWidth='sm' fullWidth>
      <form onSubmit={handleUpdate}>
      <DialogTitle>Edit Todo</DialogTitle>
      <DialogContent>
      <Stack spacing={2}>
      <TextField
                  label='Title'
                  id='title-id'
                  placeholder='Enter a title'
                  size='small'
                  fullWidth
                  autoFocus
                  name='title'
                  value={editValue.title}
                  onChange={handleEditChange}
                />

                <TextField
                  multiline
                  label='Description'
                  id='title-id'
                  placeholder='Enter a description'
                  size='small'
                  fullWidth
                  name='description'
                  value={editValue.description}
                  onChange={handleEditChange}
                />
                </Stack>
          </DialogContent>
          <DialogActions>
          <Button
                size='small'
                variant='contained'
                fullWidth
                type="submit"
              >
                Update
              </Button>

          </DialogActions>
          </form>
      </Dialog>
    </div>
  );
}


export default App;