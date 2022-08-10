import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie"

import Link from "next/link";
import styles from "@styles/Account.module.css";
import { authUser } from "@services/portfolio_api";



const Login = () => {
	const router = useRouter();
	const [error, setError] = useState("");
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [cookies, setCookie] = useCookies(["user"])

	const onSubmit = async (data) => {
		try {
			const response = await authUser(data);
			const body = await response.json();
			switch (response.status) {
				case 200:
					setCookie("user", body, {
						path: "/account",
						maxAge: 3600, // Expires after 1hr
						sameSite: true,
					});
					router.push("/account/home");
					break;
				case 401:
					// creds not accepted
					setError("no");
					break;
				default:
					// something went wrong
					setError("uh oh");
			}
		} catch (error) {
			console.log(error);
		}


	}

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.account_form}>
				{error && <span className={styles.error}>{error}</span>}
				<input type="text" placeholder="username" {...register("username", { required: true })} />
				<input type="password" placeholder="password" {...register("password", { required: true })} />

				<button>Login</button>
				<Link href="/account/register">register</Link>
			</form>
		</div>
	);
};

export default Login;