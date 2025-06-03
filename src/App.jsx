import { useRef, useState } from "react";
import styles from "./App.module.css";

function App() {
	const [data, setData] = useState({
		email: "",
		password: "",
		passwordRepeat: "",
	});
	const [error, setError] = useState({});

	const submitButtonRef = useRef(null);

	const onChange = ({ target }) => {
		const { name, value } = target;
		const { email, password, passwordRepeat } = data;
		const currentState = { ...data, [name]: value };
		setData(currentState);

		const newError = {};

		if (!email) {
			newError.email = "Укажите почту";
		} else if (
			!/^([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(email)
		) {
			newError.email = "Неверный E-mail. Формат почты: user@user.ru";
		} else if (email.length > 30) {
			newError.email =
				"Неверный логин. Должно быть не больше 20 символов";
		}

		if (!password) {
			newError.password = "Укажите пароль";
		} else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)$/.test(password)) {
			newError.password =
				"Неверный пароль. Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один специальный символ";
		} else if (password.length < 8) {
			newError.password =
				"Неверный пароль. Должно быть больше 8 символов";
		}

		if (!passwordRepeat) {
			newError.passwordRepeat = "Подтвердите пароль";
		} else if (password !== passwordRepeat) {
			newError.passwordRepeat = "Пароли не совпадают";
		}
		setError(newError);

		if (Object.keys(newError).length === 0) {
            submitButtonRef.current.focus()
        }
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(data);
	};
	return (
		<>
			<div className={styles.registration}>
				Регистрация пользователя:
				<form onSubmit={onSubmit} className={styles.form}>
					{error.email && <div>{error.email}</div>}
					<input
						type="email"
						name="email"
						value={data.email}
						className={styles.email}
						onChange={onChange}
						placeholder="E-mail"
					/>

					{error.password && <div>{error.password}</div>}

					<input
						type="password"
						name="password"
						value={data.password}
						className={styles.password}
						onChange={onChange}
						placeholder="Пароль"
					/>

					{error.passwordRepeat && <div>{error.passwordRepeat}</div>}
					<input
						type="password"
						name="passwordRepeat"
						value={data.passwordRepeat}
						className={styles.password}
						onChange={onChange}
						placeholder="Повторите пароль"
					/>

					<button
						ref={submitButtonRef}
						type="submit"
						className={styles.registrationButton}
					>
						Зарегестрироваться
					</button>
				</form>
			</div>
		</>
	);
}

export default App;
