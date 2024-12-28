import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Books from '../Books';
import { BrowserRouter } from 'react-router-dom';

const mockBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', year: 2021, isbn: '1234567890', pages: 200, stock: 5 },
    { id: 2, title: 'Book 2', author: 'Author 2', year: 2022, isbn: '0987654321', pages: 300, stock: 3 }
];

describe('Books Component', () => {
    beforeEach(() => {
        localStorage.setItem('user_id', '1');
        global.fetch = jest.fn((url) => {
            if (url.includes('/delete')) {
                return Promise.resolve({ ok: true });
            }
            return Promise.resolve({
                json: () => Promise.resolve({ data: { allBooks: mockBooks } })
            });
        }) as jest.Mock;
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
            expect(screen.getByText('Book 2')).toBeInTheDocument();
        });
    });

    test('deletes a book', async () => {
        window.confirm = jest.fn(() => true);

        render(
            <BrowserRouter>
                <Books />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText('Delete')[0]);

        await waitFor(() => {
            expect(screen.queryByText('Book 1')).not.toBeInTheDocument();
        });
    });
});