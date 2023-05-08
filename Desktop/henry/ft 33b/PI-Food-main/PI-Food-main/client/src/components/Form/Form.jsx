import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import styles from "./Form.module.css";


export default function Formulario() {
	const dispatch = useDispatch();
	const diets = useSelector((state) => state.dietTypes.data);

	useEffect(() => {
		if (!diets.length) {
			dispatch(actions.getDiets());
		}
	}, [dispatch]);

	const [form, setForm] = useState({
		title: "",
		summary: "",
		healthScore: 0,
		steps: "",
		image: "",
		diets: [],
	});

	const [errors, setErrores] = useState({
		title: "",
		summary: "",
		healthScore: 0,
		steps: "",
		image: "",
	});

	const changeHandler = (e) => {
		const property = e.target.name;
		const value = e.target.value;
		if (property !== "diets") {
			validate({ ...form, [property]: value }); // al pasarle el mismo objeto, la validacion se hace al mismo tiempo que lo que se envia al estado form
			setForm({ ...form, [property]: value });
			return;
		}
		if (e.target.checked) {
			setForm({ ...form, diets: [...form.diets, parseInt(value)] });
		} else {
			setForm({
				...form,
				diets: form.diets.filter((x) => x !== parseInt(value)),
			});
		}

		//Si la propiedad es "diets", entonces se verifica si el elemento del formulario ha sido marcado o desmarcado. Si está marcado, se agrega el valor del elemento a un nuevo arreglo, que luego se combina con el objeto form actual y se pasa a setForm. Si el elemento se desmarca, se filtra el valor del elemento del arreglo actual form.diets, y el nuevo arreglo resultante se combina con el objeto form actual y se pasa a setForm.
	};

	const validate = (form) => {

		if (/^[\s\S]{3,50}$/.test(form.title)) {
			setErrores({ ...errors, title: "" });
		} else {
			setErrores({
				...errors,
				title: "No se puede ingresar un campo vacio",
			});
		}

		if (/^[\s\S]{3,50}$/.test(form.summary)) {
			setErrores({ ...errors, summary: "" });
		} else {
			setErrores({
				...errors,
				summary: "No se puede ingresar un campo vacio",
			});
		}

		if (/^[\s\S]{3,50}$/.test(form.steps)) {
			setErrores({ ...errors, steps: "" });
		} else {
			setErrores({
				...errors,
				steps: "No se puede ingresar un campo vacio",
			});
		}

		if (/^0*(?:[1-9][0-9]?|100)$/.test(form.healthScore)) {
			setErrores({ ...errors, healthScore: "" });
		} else {
			setErrores({ ...errors, healthScore: "Ingresa un numero entre 0 y 100" });

		}
	};

	function submitHandler(e) {
		e.preventDefault();
		axios.post("http://localhost:3001/recipes", form).then((res) => alert("receta creada"))
			.catch(err => alert(err));

		setForm({
			...form,
			title: "",
			summary: "",
			healthScore: 0,
			steps: "",
			image: "",
			diets: [],
		})
	}

	return (
		<div className={styles.formSection}>
			<div className={styles.formHeader}>
				<h2>Añadí una nueva receta</h2>
			</div>
			<div className={styles.formContainer}>
				<form onSubmit={submitHandler} className={styles.formulario}>
					<div className={styles.inputName}>
						<label className={styles.inputTitle}>Nombre de la receta</label>
						<input
							type="text"
							value={form.title}
							name="title"
							onChange={changeHandler}
						/>
						{errors.title && <span>{errors.title}</span>}
					</div>
					<div className={styles.inputResumen}>
						<label className={styles.inputTitle}>Resumen</label>
						<textarea
							type=""
							value={form.summary}
							name="summary"
							onChange={changeHandler}
						/>
					</div>
					<div className={styles.inputName}>
						<label className={styles.inputTitle}>
							Nivel de comida saludable
						</label>
						<input
							type="number"
							value={form.healthScore}
							name="healthScore"
							onChange={changeHandler}
						/>
						{errors.healthScore && <span>{errors.healthScore}</span>}
					</div>
					<div className={styles.inputPasos}>
						<label className={styles.inputTitle}>Pasos</label>
						<input
							type="text"
							value={form.steps}
							name="steps"
							onChange={changeHandler}
						/>
					</div>
					<div className={styles.inputDietas}>
						<label className={styles.inputTitle}>Dietas</label>
						{diets.map((x) => {
							return (
								<div key={x.id}>
									<label htmlFor="">
										<input
											className={styles.inputCheck}
											type="checkbox"
											onChange={changeHandler}
											name="diets"
											value={x.id}
										/>
										{x.name}
									</label>
								</div>
							);
						})}
					</div>

					{form.title.length && form.healthScore.length ? (
						<button type="submit" className={styles.buttonForm}>
							Enviar
						</button>
					) : (
						<button type="submit" className={styles.buttonForm} disabled>
							Enviar
						</button>
					)}
				</form>
			</div>
		</div>
	);
}
