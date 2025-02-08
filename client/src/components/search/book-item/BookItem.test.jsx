import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from "@testing-library/react";
import BookItem from './BookItem';
import { BrowserRouter } from 'react-router-dom';


describe('BookItem Component', async () => {

    it('Renders book component ', async () => {
        const book = { _id: '1', title: 'Book 1', coverImageUrl: 'url1', price: 10 }
        const submitHandler = vi.fn()

        render(
            <BrowserRouter>
                <BookItem
                    book={book}
                    submitHandler={submitHandler}
                />
            </BrowserRouter>
        );


        expect(await screen.findByText('Book 1')).toBeInTheDocument()
        expect(await screen.findByText('$10')).toBeInTheDocument()

        const image =  screen.getByTestId('book-cover-image');
        expect(image).toBeInTheDocument();

    })

    it('Calls details for the right book', () => {
        const book = { _id: '1', title: 'Book 1', coverImageUrl: 'url1', price: 10 }
        const submitHandler = vi.fn()

        render(
            <BrowserRouter>
                <BookItem
                    book={book}
                    submitHandler={submitHandler}
                />
            </BrowserRouter>
        );

        const bookLink = screen.getByTestId('book-cover-image');
        fireEvent.click(bookLink);

        expect(window.location.href).toEqual('http://localhost:3000/details/1');
    })

})