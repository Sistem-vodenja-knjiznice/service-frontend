import React, {useEffect} from 'react';
import Wrapper from "../Wrapper";


const Borrows = () => {
    const [borrows, setBorrows] = React.useState([]);
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    useEffect(() => {
        const getBorrows = async () => {
            const response = await fetch(`${BASE_URL}/api/borrows`);
            const data = await response.json();

            setBorrows(data);
        };

        getBorrows();
    }, []);

    const return_borrow = async (id: number, user_id: number,book_id: number) => {
        if (window.confirm('Are you sure you want to return this book?')) {
            await fetch(`${BASE_URL}/api/borrows/return`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id, book_id })
            });

            setBorrows((prevBorrows: any) =>
                prevBorrows.map((borrow: any) =>
                    borrow.id === id ? { ...borrow, status: 'returned' } : borrow
                )
            );

            alert('Book returned successfully!');
        }
    }

    const extend_borrow = async (id: number, user_id: number,book_id: number) => {
        await fetch(`${BASE_URL}/api/borrows/extend`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, book_id })
        });

        setBorrows((prevBorrows: any) =>
            prevBorrows.map((borrow: any) =>
                borrow.id === id
                    ? {
                        ...borrow,
                        status: 'extended',
                        extend_count: (borrow.extend_count || 0) + 2,
                        due_date: borrow.due_date
                            ? new Date(new Date(borrow.due_date).setDate(new Date(borrow.due_date).getDate() + 14)).toISOString().split('T')[0]
                            : null,
                    }
                    : borrow
            )
        );

        alert('Book extended successfully!');
    }

    return (
        <Wrapper>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User</th>
                        <th scope="col">Book</th>
                        <th scope="col">Borrow date</th>
                        <th scope="col">Due date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Extend count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {borrows.map((borrow: any) => {
                        return (
                            <tr key={borrow.id}>
                                <td>{borrow.id}</td>
                                <td>{borrow.user_id}</td>
                                <td>{borrow.book_id}</td>
                                <td>{borrow.borrow_date}</td>
                                <td>{borrow.due_date}</td>
                                <td>{borrow.status}</td>
                                <td>{borrow.extend_count}</td>
                                <td>
                                    <div className='btn-group mr-2'>
                                        <a href="#" className='btn btn-sm btn-outline-secondary'
                                           onClick={() => return_borrow(borrow.id, borrow.user_id,
                                               borrow.book_id)}
                                        >Return</a>
                                        <a href="#" className='btn btn-sm btn-outline-secondary'
                                           onClick={() => extend_borrow(borrow.id, borrow.user_id,
                                               borrow.book_id)}
                                        >Extend</a>
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

export default Borrows;