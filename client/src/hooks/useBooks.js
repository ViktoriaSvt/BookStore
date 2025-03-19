import { useEffect, useState } from "react";
import * as bookApi from '../api/book-requests'
import { useParams } from "react-router-dom";


export function useGetAllBooks() {
  const [books, setBooks] = useState([])


  
  useEffect(() => {
    (async () => {
      const response = await bookApi.getAll();
      console.log(response);
      
      setBooks(response);
    })();
  }, []);

  return [ books, setBooks ]
}


export function useGetBookById() {
  const [book, setBook] = useState([])
  const { bookId } = useParams();

  useEffect(() => {
    (async () => {

        const response = await bookApi.getById(bookId);
        setBook(response);

    })();
  }, [bookId]);

  return [book]
}

export function useGetNewestBooks(year) {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    (async () => {
 
        const response = await bookApi.getNewest(year);
        setBooks(response);

    })();
  }, [year]);

  return [books]
}


