import * as React from 'react';
import { useState, useRef, useCallback} from 'react';
import TextField from '@mui/material/TextField';
import useBookSearch from './useBookSearch'
import style from './style.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumer] = useState(1)

  const {
    books,
    hasMore,
    loading,
    error
 } = useBookSearch(query, pageNumber)

  const observer = useRef()

  const lastBookElementRef = useCallback(node => {
    if (loading) return 
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore){
        setPageNumer(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumer(1)
  }


return(
  <>
  <TextField value={query} onChange={handleSearch}
    helperText="Enter Book Name"
    id="demo-helper-text-aligned"
    label="Book Name"
  />
  <div className='text-result'>{books.filter(books => !books.complete).length} Results </div>
  {books.map((book, index) => {
    if (books.length === index + 1){
      return <div ref={lastBookElementRef} key={book}>{book}</div>
    } else {
      return <div key={book}>{book}</div>
    }
  })}
  <div className='loading'>{loading && 'Loading . . .'}</div>
  <div className='error'>{error && 'Check Logs . . .'}</div>
  </>
);
}
