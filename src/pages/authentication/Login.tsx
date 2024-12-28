import React, {SyntheticEvent} from 'react';
import { useNavigate  } from 'react-router-dom';
import Wrapper from "../Wrapper";
import {User} from "../../interfaces/User";

const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const BASE_URL = process.env.REACT_APP_API_BASE_URL || '';


    const login = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(`${BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
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
                <form onSubmit={login}>
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
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Wrapper>
    );
};

export default Login;