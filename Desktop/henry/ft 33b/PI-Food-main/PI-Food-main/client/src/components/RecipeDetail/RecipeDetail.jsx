import React, { useEffect } from "react";
import styles from "./RecipeDetail.module.css";
import * as actions from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function RecipeDetail() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const recipesDetail = useSelector((state) => state.recipeDetail.data);

	useEffect(() => {
		dispatch(actions.getRecipesDetail(id));
	}, [dispatch]);

	console.log(recipesDetail);

	function removeTags(str) {
		if (str === null || str === "") return false;
		else str = str.toString();

		return str.replace(/(<([^>]+)>)/gi, "");
	}

	return (
		<div className={styles.detailSection}>
			{console.log(recipesDetail)}
			<div className={styles.overlay}></div>

			<div className={styles.detailHeader}>
				<h2>{recipesDetail.title}</h2>
			</div>

			<div className={styles.recipeDetail}>
				<Link to="/home" className={styles.btn}>
					<i class="bx bxs-chevron-left"></i>Volver
				</Link>
				<div>
					<div className={styles.infoContainer}>
						<p>{recipesDetail.summary && removeTags(recipesDetail.summary)}</p>
						<p>Nivel de comida saludable: {recipesDetail.healthScore}</p>
					</div>
					<div className={styles.imgContainer}>
						{recipesDetail.image ? (
							<img src={recipesDetail.image} alt="" />
						) : (
							<img src="https://img.freepik.com/vector-gratis/cute-burger-chef-thumbs-up-cartoon-icon-illustration-icono-chef-comida-aislado-estilo-dibujos-animados-plana_138676-3109.jpg?w=826&t=st=1683572712~exp=1683573312~hmac=443fc4ff1b4879501388bb09e409775182aed6ae00da6ca2e52020eba488d132" alt="" />
						)}
					</div>

				</div>
				<h2>Pasos:</h2>
				<div className={styles.listSteps}>
					{Array.isArray(recipesDetail.steps) ?
						<div className={styles.listSteps}>
							<ul>
								{recipesDetail.steps.map((x) => (
									<li>
										{x.number}: {x.step}
									</li>
								))}
							</ul>
						</div>
						:
						<p>{recipesDetail.steps}</p>
					}
				</div>
			</div>
		</div>
	);
}
