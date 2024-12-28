import React, {SyntheticEvent, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Wrapper from "../Wrapper";

const BooksEdit = () => {
    const { id } = useParams();

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [year, setYear] = React.useState('');
    const [pages, setPages] = React.useState('');
    const [isbn, setISBN] = React.useState('');
    const [stock, setStock] = React.useState('');
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch(`${BASE_URL}/api/books/${id}`);
            const data = await response.json();
            setTitle(data.title);
            setAuthor(data.author);
            setYear(data.year);
            setPages(data.pages);
            setISBN(data.isbn);
            setStock(data.stock);
        };

        fetchBook();

    });

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/api/books/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, year, pages, isbn, stock })
        });

        navigate('/books');
    };

    return (
        <Wrapper>
        <div>
            <h2>Edit Book</h2>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={author}
                        onChange={e => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Year</label>
                    <input
                        type="number"
                        className="form-control"
                        defaultValue={year}
                        onChange={e => setYear(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pages</label>
                    <input
                        type="number"
                        className="form-control"
                        defaultValue={pages}
                        onChange={e => setPages(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={isbn}
                        onChange={e => setISBN(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        defaultValue={stock}
                        onChange={e => setStock(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </Wrapper>
    );
};

export default BooksEdit;