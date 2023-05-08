import './App.css';
import { Route, useLocation } from "react-router-dom"
import { Form, RecipeDetail, Landing, Home, Header } from "./components"




function App() {

  const location = useLocation()

  return (
    <div className="App">
      {location.pathname !== "/" && <Header />}

      <Route exact path="/">
        <Landing />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/recipes/:id">
        <RecipeDetail />
      </Route>

      <Route path="/create">
        <Form />
      </Route>

    </div>
  );
}

export default App;
