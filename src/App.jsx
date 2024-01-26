import './App.css';
import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBook from './AddBook';
function App() { 

  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetchBooks();
  }, [])

  const columnDefs = [
    {field: 'title', sortable: true, filter: true},
    {field: 'author', sortable: true, filter: true},
    {field: 'year', sortable: true, filter: true},
    {field: 'isbn', sortable: true, filter: true},
    {field: 'price', sortable: true, filter: true},
    { 
      headerName: '',
      field: 'id',
      width: 90,
      cellRenderer: cell => 
      <IconButton onClick={() => deleteBook(cell.value)} size="small" color="error">
        <DeleteIcon />
      </IconButton> 
    }
  ]

  const fetchBooks = () => {
    fetch('https://book-store-d3972-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
    .then(response => response.json())
    .then(data => setBooks(Object.values(data)))
    .catch(err => console.error(err))
  }

  const addBook = (newBook) => {
    fetch('https://book-store-d3972-default-rtdb.europe-west1.firebasedatabase.app/books/.json', {
      method: 'POST',
      body: JSON.stringify(newBook),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => fetchBooks())
      .catch(err => console.error(err));
  }

  const deleteBook = (id) => {
    fetch(`https://book-store-d3972-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchBooks())
    .catch(err => console.error(err))
  }



return (
  <>

<AppBar color='success' position='static'>
  <Toolbar position="static">
    <Typography variant="h5">Bookstore</Typography>
  </Toolbar>
  </AppBar> 

  <AddBook  addBook={addBook}/>
<div className='ag-theme-material' style={{height: 400, width: 1200}}>
  <AgGridReact 
  
  rowData={books}
  columnDefs={columnDefs}
  
  />
  

</div>



  </>
);
}

export default App;