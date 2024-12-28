import React, {SyntheticEvent} from 'react';
import { useNavigate  } from 'react-router-dom';
import Wrapper from "../Wrapper";
import {User} from "../../interfaces/User";

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

    const register = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(`${BASE_URL}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, name, surname })
        });

        const user: User = await response.json();
        saveUserId(user.id);

        navigate('/books');
    };

    const saveUserId = (id:number) => {
        localStorage.setItem('user_id', id.toString());
    };

    return (
        <Wrapper>
            <div>
                <h2>Login</h2>
                <form onSubmit={register}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Surname</label>
                        <input
                            type="text"
                            className="form-control"
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Wrapper>
    );
};

export default Register;