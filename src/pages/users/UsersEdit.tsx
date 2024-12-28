import React, {SyntheticEvent, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Wrapper from "../Wrapper";

const UsersEdit = () => {
    const { id } = useParams();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    useEffect(() => {
        const fetchBook = async () => {
            const response = await fetch(`${BASE_URL}/api/users/${id}`);
            const data = await response.json();
            setUsername(data.username);
            setPassword(data.password);
            setName(data.name);
            setSurname(data.surname);
        };

        fetchBook();
    });

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`${BASE_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, name, surname })
        });

        navigate('/users');
    };

    return (
        <Wrapper>
        <div>
            <h2>Edit User</h2>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Surname</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={surname}
                        onChange={e => setSurname(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </Wrapper>
    );
};

export default UsersEdit;