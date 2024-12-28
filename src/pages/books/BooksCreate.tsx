import React, {SyntheticEvent} from 'react';
import Wrapper from "../Wrapper";
import { useNavigate  } from 'react-router-dom';

const BooksCreate = () => {
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [year, setYear] = React.useState('');
    const [pages, setPages] = React.useState('');
    const [isbn, setISBN] = React.useState('');
    const [stock, setStock] = React.useState('');
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/api/books`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, year, pages, isbn, stock })
        });

        navigate('/books');
    };

    return (
        <Wrapper>
        <div>
            <h2>Create Book</h2>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Year</label>
                    <input
                        type="number"
                        className="form-control"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">pages</label>
                    <input
                        type="number"
                        className="form-control"
                        value={pages}
                        onChange={e => setPages(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">ISBN</label>
                    <input
                        type="text"
                        className="form-control"
                        value={isbn}
                        onChange={e => setISBN(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
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

export default BooksCreate;