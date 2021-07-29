import { useState } from 'react'
import './App.css'
import ChicagoWardMap from './maps/wards'

function App() {
  const [ward, setWard] = useState(null)

  return (
    <div className="App">
      <div className='map-viewer'>
        <ChicagoWardMap 
          onSelectWard={setWard}
        />
        {ward && <p>Ward {ward.ward}'s shape_area = {ward.shape_area} and shape_leng = {ward.shape_leng}</p>}
      </div>
    </div>
  );
}

export default App
