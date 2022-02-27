import * as React from 'react';
import { useState, useRef} from 'react';
import TextField from '@mui/material/TextField';
import useBookSearch from './useBookSearch'
import style from './style.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumer] = useState(1)

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumer(1)
  }

  const {
     books,
     hasMore,
     loading,
     error
  } = useBookSearch(query, pageNumber)

return(
  <>
  <TextField value={query} onChange={handleSearch}
    helperText="Enter Book Name"
    id="demo-helper-text-aligned"
    label="Book Name"
  />
  {books.map(book => {
    return <div key={book}>{book}</div>
  })}
  <div className='loading'>{loading && 'Loading . . .'}</div>
  <div className='error'>{error && 'Check Logs . . .'}</div>
  </>
);
}
