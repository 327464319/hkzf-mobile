

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import CityList from './pages/CityList/index';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <ul>
        <li>
          <Link to='/home'>首页</Link>
         </li>
        <li>
           <Link to='/citylist'>城市列表</Link>
        </li>
     </ul>
      <Route path='/citylist' component={CityList}/>
      <Route path="/home" component={Home}/>
     
   </Router>
  );
}

export default App;
