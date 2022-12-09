import { Route } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Welcome from "./components/Pages/Welcome";


function App() {
  return (
    <>
      <AuthForm></AuthForm>
     <Route path='/' exact> <AuthForm></AuthForm></Route>
      <Route path='/Welcome'>
        <Welcome/>
      </Route>
    </>
  );
}
export default App;