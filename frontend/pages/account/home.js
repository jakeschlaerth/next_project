import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie"
import Link from "next/link";

import styles from "@styles/Account.module.css";


const Home = () => {
	const router = useRouter();
	const [cookies, removeCookie] = useCookies();
	const [authed, setAuthed] = useState(false);
	useEffect(() => {
		if (cookies.user.jwt == undefined) {
			router.push("/account/login");
		} else {
			setAuthed(true);
		}
	}, []);

	const logOut = () => {
		removeCookie('user');
	}

	return (
		authed &&
		<div className={styles.container}>
			<div className="flex_container">you're logged in now</div>
			<Link href="/account/login"><span onClick={logOut}> logout</span></Link>
		</div >
	);


};

export default Home;