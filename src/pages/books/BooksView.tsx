import React, {useEffect} from 'react';
import Wrapper from "../Wrapper";
import {useParams, Link} from "react-router-dom";


const BooksView = () => {
    const { id } = useParams();

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [year, setYear] = React.useState('');
    const [pages, setPages] = React.useState('');
    const [isbn, setISBN] = React.useState('');
    const [stock, setStock] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [averageRating, setAverageRating] = React.useState('');

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
            setDescription(data.description);
            setAverageRating(data.averageRating);
        };

        fetchBook();

    }, []);

    return (
        <Wrapper>
            <div className='pt-3 pb-2 mb-3 border-bottom'>
                <div className='btn-toolbar mb-2 mb-md-0'>
                    <Link className='btn btn-sm btn-outline-secondary' to='/books'>
                        Back to List
                    </Link>
                </div>
            </div>

            <div className="book-details">
                <h1>{title}</h1>
                <p><strong>Author:</strong> {author}</p>
                <p><strong>Year:</strong> {year}</p>
                <p><strong>ISBN:</strong> {isbn}</p>
                <p><strong>Pages:</strong> {pages}</p>
                <p><strong>Stock:</strong> {stock}</p>
                <p><strong>Description:</strong> {description || 'No description available.'}</p>
                <p><strong>Average Rating:</strong> {averageRating || 'No ratings available.'}</p>
            </div>
        </Wrapper>
    );
};

export default BooksView;