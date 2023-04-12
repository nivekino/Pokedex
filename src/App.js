import "./App.css";
import AppRouter from "./Routers/AppRouter";
import {PokemonProvider} from "./Context/PokemonProvider";

function App() {
  return(
    <PokemonProvider>
      <AppRouter />
    </PokemonProvider>
  );
}

export default App;
