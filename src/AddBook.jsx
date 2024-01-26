import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

function AddBook(props) {
    const [book, setBook] = useState({title: '', author:'', year:'', isbn:'', price:''})
    const [open, setOpen] = useState(false);

    //Close and Open modal form
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }



    //Add new books
    const inputChanged = (e) => {
        setBook({...book, [e.target.name]: e.target.value});
    }
    const handleSave = () => {
        props.addBook(book);
        handleClose();
    }


    return(
      <>
<Button variant='outlined' color='success' onClick={handleOpen}>
    Add Book
</Button>
<Dialog open={open}>
    <DialogTitle>New Book</DialogTitle>
    <DialogContent>
        <TextField name='title' value={book.title} onChange={inputChanged} margin='dense' label='Title' fullWidth/>
        <TextField name='author' value={book.author} onChange={inputChanged} margin='dense' label='Author' fullWidth/>
        <TextField name='year' value={book.year} onChange={inputChanged} margin='dense' label='Year' fullWidth/>
        <TextField name='isbn' value={book.isbn} onChange={inputChanged} margin='dense' label='Isbn' fullWidth/>
        <TextField name='price' value={book.price} onChange={inputChanged} margin='dense' label='Price' fullWidth/>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
    </DialogActions>
</Dialog>

      
      </>
    );
  }
  
  export default AddBook;