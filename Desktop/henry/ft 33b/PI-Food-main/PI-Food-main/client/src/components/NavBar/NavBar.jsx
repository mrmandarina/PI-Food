import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function Navbar() {
	const location = useLocation();
	return (
		<nav className={styles.nav}>
			{location.pathname === "/create" ? (
				<Link to="/home" className={styles.btn}>
					Volver
				</Link>
			) : (
				<Link to="/create" className={styles.btn}>
					Crear Receta
				</Link>
			)}
		</nav>
	);
}
