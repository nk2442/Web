import { useState } from 'react'

function Signin (props) {
	
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [passOK, setPassOK] = useState(true);
	
	const [pass1, setPass1] = useState("");
	const [pass2, setPass2] = useState("");
	
	const getLogin = (evt) => {setLogin(evt.target.value)};
	const getFirstName = (evt) => {setFirstName(evt.target.value)};
	const getLastName = (evt) => {setLastName(evt.target.value)};
	const getPass1 = (evt) => {setPass1(evt.target.value)};
	const getPass2 = (evt) => {setPass2(evt.target.value)};
	
	const submissionHandler = (evt) => {
		if (pass1 === pass2){
			setPassOK(true);
			props.login();
		}
		else{
			setPassOK(false);
		}
	}

	return (
	<div className="form-container">
		<form onSubmit={submissionHandler}>
			<div className="form-row">
				<label htmlFor="firstname">First name</label>
				<input id="firstname" onChange={getFirstName}/>
			</div>
			<div className="form-row">
				<label htmlFor="lastname">Last name</label>
				<input id="lastname" onChange={getLastName}/>
			</div>
			<div className="form-row">
				<label htmlFor="signin_login">Login</label>
				<input id="signin_login" onChange={getLogin}/>
			</div>
			<div className="form-row">
				<label htmlFor="signin_mdp1">Password</label>
				<input type="password" id="signin_mdp1" onChange={getPass1}/>
			</div>
			<div className="form-row">
				<label htmlFor="signin_mdp2">Password (2)</label>
				<input type="password" id="signin_mdp2" onChange={getPass2}/>
			</div>
			<div className="button-group">
				<button type="submit">Sign In</button>
				<button type="reset">Reset</button>
			</div>
			{passOK ? null : <p className="error-message">Erreur: mots de passe différents</p>}
		</form>
	</div>
   );
}

export default Signin;