import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie"
import { decrypt } from "@services/jwt";

import styles from "@styles/Account.module.css";


const Home = () => {
	const router = useRouter();
	const [cookies, removeCookie] = useCookies();
	const [user, setUser] = useState(false);

	useEffect(() => {
		if (cookies.user.jwt == undefined) {
			router.push("/account/login");
		} else {
			const jwt = require('jsonwebtoken');
			setUser(decrypt(cookies.user.jwt));
		}
	}, []);

	const logOut = () => {
		removeCookie('user');
		router.push("/account/login");
	}

	return (
		user &&
		<div className={styles.container}>
			<div className="flex_container">
				<p>hi {user.username}</p>
				here are the parameters stored in your json web token
				<ul>
					<li>your name is {user.username}</li>
					<li>your user id in the database is {user.id}</li>
					<li>this token was issued at {new Date(user.iat * 1000).toLocaleString("en-US")}</li>
				</ul>
				<button onClick={logOut}>logout</button>
			</div>
		</div >
	);


};

export default Home;