import { useState } from 'react';

function Login (props) {
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	
	const getLogin = (evt) => {setLogin(evt.target.value)}
	const getPassword = (evt) => {setPassword(evt.target.value)} 	

	return (
		<div className="form-container">
			<form onSubmit={props.login}>
				<div className="form-row">
					<label htmlFor="login">Login</label>
					<input id="login" onChange={getLogin}/>
				</div>
				<div className="form-row">
					<label htmlFor="mdp">Mot de passe</label>
					<input type="password" id="mdp" onChange={getPassword}/>
				</div>
				<div className="button-group">
					<button type="submit">Log In</button>
					<button type="reset">Reset</button>
				</div>
			</form>
		</div>
	 );
}

export default Login;