

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import CityList from './pages/CityList/index';
import Home from './pages/Home';
import Map from './pages/Map';


function App() {
  return (
    <Router>
      <Route exact path='/' render={()=><Redirect to='/home/index'/>}></Route>
      <Route path='/citylist' component={CityList}/>
      <Route path="/home" component={Home} />
      <Route path="/map" component={Map} />
   </Router>
  );
}

export default App;
