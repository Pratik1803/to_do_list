import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Signin from './signin/Signin';
import Home from './home/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/to_do_list" component={Login} />
        <Route exact path="/to_do_list/sign-in" component={Signin} />
        <Route exact path="/to_do_list/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
