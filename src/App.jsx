import styles from "./App.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const onSubmit = (formData) => {
	console.log(formData);
};
const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.required("Укажите почту")
		.matches(
			/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
			"Неверный E-mail. Формат почты: user@user.ru"
		)
		.min(6, "Неверный E-mail. Должно быть не меньше 6 символов")
		.max(30, "Неверный E-mail. Должно быть не больше 30 символов"),
	password: yup
		.string()
		.required("Укажите пароль")
		.matches(
			/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
			"Неверный пароль. Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один специальный символ"
		)
		.min(8, "Неверный пароль. Должно быть больше 8 символов"),
	passwordRepeat: yup
		.string()
		.required("Подтвердите пароль")
		.oneOf([yup.ref("password")], "Пароли должны совпадать"),
});

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			passwordRepeat: "",
		},
		resolver: yupResolver(fieldsSchema),
	});

	const errorsMessage = {
		emailError: errors.email ? errors.email.message : null,
		passwordError: errors.password ? errors.password.message : null,
		passwordRepeatError: errors.passwordRepeat
			? errors.passwordRepeat.message
			: null,
	};

	return (
		<>
			<div className={styles.registration}>
				Регистрация пользователя:
				<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
					{errorsMessage.emailError && (
						<div>{errorsMessage.emailError}</div>
					)}
					<input
						type="email"
						name="email"
						className={styles.email}
						{...register("email")}
						placeholder="E-mail"
					/>

					{errorsMessage.passwordError && (
						<div>{errorsMessage.passwordError}</div>
					)}

					<input
						type="password"
						name="password"
						className={styles.password}
						{...register("password")}
						placeholder="Пароль"
					/>

					{errorsMessage.passwordRepeatError && (
						<div>{errorsMessage.passwordRepeatError}</div>
					)}
					<input
						type="password"
						name="passwordRepeat"
						className={styles.password}
						{...register("passwordRepeat")}
						placeholder="Повторите пароль"
					/>

					<button type="submit" className={styles.registrationButton}>
						Зарегестрироваться
					</button>
				</form>
			</div>
		</>
	);
}

export default App;
