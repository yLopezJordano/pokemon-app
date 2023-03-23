import './App.css';
import RoutesList from './Routes/Routes';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RecoilRoot>
          <RoutesList/>
        </RecoilRoot>
      </header>
    </div>
  );
}

export default App;
