import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { useCookies } from "react-cookie"

import Link from "next/link";
import styles from "@styles/Account.module.css";
import { registerUser } from "@services/portfolio_api";


const Register = () => {
	const router = useRouter();
	const [error, setError] = useState("");
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [cookie, setCookie] = useCookies(["user"])

	const onSubmit = async (data) => {
		try {
			const response = await registerUser(data);
			switch (response.status) {
				case 200:
					setCookie("user", response.jwt, {
						path: "/",
						maxAge: 3600, // Expires after 1hr
						sameSite: true,
					});
					router.push("/account/home");
					break;
				case 400:
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
	// console.log(errors);

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.account_form}>
				{error && <span className={styles.error}>{error}</span>}

				<input type="text" placeholder="username" {...register("username", { required: true })} />
				<input type="password" placeholder="password" {...register("password", { required: true })} />
				<input type="password" placeholder="confirm password" {...register("password_confirm", { required: true })} />

				<button>Register</button>
				<Link href="/account/login">login</Link>
			</form>
		</div>
	);
};

export default Register;