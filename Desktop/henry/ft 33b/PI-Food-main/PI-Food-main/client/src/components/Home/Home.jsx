import RecipesContainer from "../RecipesContainer/RecipesContainer"
import styles from "./Home.module.css"

const Home = () => {

    return (
        <div className={styles.home}>
            <div className={styles.container}>
                <div className={styles.headerHome}>
                    
                </div>
                <RecipesContainer />
            </div>
        </ div>
    )
}

export default Home