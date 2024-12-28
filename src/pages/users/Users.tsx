import React, {useEffect} from 'react';
import Wrapper from "../Wrapper";
import {Link} from "react-router-dom";

const Users = () => {
    const [users, setUsers] = React.useState([]);
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch(`${BASE_URL}/api/users`);
            const data = await response.json();
            setUsers(data);
        };

        getUsers();
    }, []);

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await fetch(`${BASE_URL}/api/users/${id}`, {
                method: 'DELETE'
            });

            setUsers(users.filter(
                (user: any) => user.id !== id)
            );
        }
    }

    return (
        <Wrapper>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: any) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>
                                    <div className='btn-group mr-2'>
                                        <Link className='btn btn-sm btn-outline-secondary'
                                              to={`/users/${user.id}/edit`}>Edit</Link>
                                        <a href="#" className='btn btn-sm btn-outline-secondary'
                                           onClick={() => del(user.id)}
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

export default Users;