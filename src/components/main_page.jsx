import { useState } from 'react';
import NavigationPanel from "./navigationpanel";
import Signin from "./signin"
import Dashboard from "./Dashboard"

function MainPage (props) {
	const [isConnected, setConnect] = useState(false);
	const [page, setPage] = useState("signin_page");
	
	const getConnected = () => {
		setConnect(true);
		setPage("message_page");	
	}
	
	const setLogout = () => {
		setConnect(false);
		setPage("signin_page");
	}
	
	return (
		<>
			<NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected}/>
			<div>
				{page === "signin_page" ? 
					<Signin login={getConnected} /> : 
					<Dashboard />
				}
			</div>
		</>
	);
}

export default MainPage;