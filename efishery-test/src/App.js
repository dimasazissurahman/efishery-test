import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import { Home } from './container/home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/detail-page/id=:number" component={DetailPage} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
