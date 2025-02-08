import { describe, expect, it, vi } from 'vitest';
import Search from './BookList';
import { fireEvent, render, screen } from "@testing-library/react";
import { useGetAllBooks } from '../../hooks/useBooks';
import { addToCart } from '../../api/cart-requests';
import { BrowserRouter } from 'react-router-dom';


it('true test', () => {
    expect(true).toEqual(true);
})

vi.mock('../../api/cart-requests');
vi.mock('../../hooks/useBooks', () => ({
    useGetAllBooks: vi.fn(),
}));

describe('BookList Component',async () => {


    it('Renders search form', async () => {
        useGetAllBooks.mockReturnValue([[], vi.fn()]);

        render(<Search />)

        const searchform = await screen.findByRole('form');
        expect(searchform).toBeInTheDocument();

        const inputText = await screen.findByPlaceholderText("Search for books...");
        expect(inputText).toBeInTheDocument();

    });

    it('Renders books', async () => {

        const books = [
            { _id: '1', title: 'Book 1', coverImageUrl: 'url1', price: 10 },
            { _id: '2', title: 'Book 2', coverImageUrl: 'url2', price: 15 }
        ];
        const setBooks = vi.fn();

        useGetAllBooks.mockReturnValue([books, setBooks]);

        render(
            <BrowserRouter>
                <Search />
            </BrowserRouter>
        );

        expect(await screen.findByText('Book 1')).toBeInTheDocument()
        expect(await screen.findByText('Book 2')).toBeInTheDocument()
    });


    it('Adds books to cart on button click', async () => {
        const books = [
            { _id: '1', title: 'Book 1', coverImageUrl: 'url1', price: 10 },
            { _id: '2', title: 'Book 2', coverImageUrl: 'url2', price: 15 }
        ];
        const setBooks = vi.fn();

        useGetAllBooks.mockReturnValue([books, setBooks]);
        addToCart.mockResolvedValue(true);

        render(
            <BrowserRouter>
                <Search />
            </BrowserRouter>
        );

        const buttons =  screen.getAllByText('Add to cart');
        const button = buttons[0]
 
         fireEvent.click(button)

        expect(addToCart).toHaveBeenCalledWith('1');
    })

})