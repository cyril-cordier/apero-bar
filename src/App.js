import './App.css';
import { BottleContextProvider } from './context/BottleContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import UpdatePage from './routes/UpdatePage';
import BottleDetailPage from './routes/BottleDetailPage';
import AddBottle from './routes/AddBottle';
import ProtectedRoute from './routes/ProtectedRoute';
import IngredientsList from './components/IngredientsList';
import Header from './components/Header';

function App() {
  return (
    <BottleContextProvider>

      <div className='container'>
        <Router>
          <Header />
        
          <Switch>
            <Route exact path='/' component={Home}/>
            {/* <ProtectedRoute exact path='/ingredients' component={IngredientsList}/> */}
            {/* <ProtectedRoute exact path='/addbottle' component={AddBottle}/> */}
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            {/* <Route exact path='/bottles/:id' component={BottleDetailPage}/>
            <Route exact path='/bottles/:id/update' component={UpdatePage}/> */}
            <Route component={Home}/>
          </Switch>
        </Router>
      </div>
    </BottleContextProvider>
  );
}

export default App;
