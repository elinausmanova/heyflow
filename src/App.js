import './App.css';
import data from './data.json';

import JSONExplorer from './components/JSONExplorer';

function App() {
  return (
    <div className='app'>
      <JSONExplorer json={data} />
    </div>
  );
}

export default App;
