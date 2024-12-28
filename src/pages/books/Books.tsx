import React, {useEffect, useState} from 'react';
import Wrapper from "../Wrapper";
import {Link} from "react-router-dom";

const Books = () => {
    const [books, setBooks] = React.useState([]);
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    const [userId] = useState(() => {
        return Number(localStorage.getItem('user_id')) || null; // Load from localStorage
    });

    useEffect(() => {
        const getBooks = async () => {
            const response = await fetch(`${BASE_URL}/api/books/graphql/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query:
                        `query {
                            allBooks {
                                id
                                title
                                author
                                year
                                isbn
                                pages
                                stock
                            }
                        }`,
                    variables: {}
                })
            });

            const data = await response.json();
            setBooks(data.data.allBooks);
        };

        getBooks();
    }, []);

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            await fetch(`${BASE_URL}/api/books/${id}`, {
                method: 'DELETE'
            });

            setBooks(books.filter(
                (book: any) => book.id !== id)
            );
        }
    }

    const borrow = async (id: number) => {
        if (window.confirm('Are you sure you want to borrow this book?')) {
            await fetch(`${BASE_URL}/api/borrows/borrow`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, book_id: id })
            });
        }
    }

    return (
        <Wrapper>
            <div className='pt-3 pb-2 mb-3 border-bottom'>
                <div className='btn-toolbar mb-2 mb-md-0'>
                    <Link className='btn btn-sm btn-outline-secondary' to='/books/create'>Add</Link>
                </div>
            </div>

            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Year</th>
                        <th scope="col">Pages</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Stock</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book: any) => {
                        return (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.pages}</td>
                                <td>{book.isbn}</td>
                                <td>{book.stock}</td>
                                <td>
                                    <div className='btn-group mr-2'>
                                        <a href="#" className='btn btn-sm btn-outline-secondary'
                                           onClick={() => borrow(book.id)}
                                        >Borrow</a>
                                        <Link className='btn btn-sm btn-outline-secondary'
                                              to={`/books/${book.id}/edit`}>Edit</Link>
                                        <a href="#" className='btn btn-sm btn-outline-secondary'
                                           onClick={() => del(book.id)}
                                        >Delete</a>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default Books;