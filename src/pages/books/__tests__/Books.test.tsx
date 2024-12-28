import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Books from '../Books';
import { BrowserRouter } from 'react-router-dom';

const mockBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', year: 2021, isbn: '1234567890', pages: 200, stock: 5 },
    { id: 2, title: 'Book 2', author: 'Author 2', year: 2022, isbn: '0987654321', pages: 300, stock: 3 }
];

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ data: { allBooks: mockBooks } })
    })
) as jest.Mock;

describe('Books Component', () => {
    beforeEach(() => {
        localStorage.setItem('user_id', '1');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the list of books', async () => {
        render(
            <BrowserRouter>
                <Books />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Book 2')).toBeInTheDocument();
        });

    });

    test('deletes a book', async () => {
        render(
            <BrowserRouter>
                <Books />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
        });

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true
            })
        ) as jest.Mock;

        fireEvent.click(screen.getAllByText('Delete')[0]);

        await waitFor(() => {
            expect(screen.queryByText('Book 1')).not.toBeInTheDocument();
        });
    });
});