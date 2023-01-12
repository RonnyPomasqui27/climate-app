import './App.css'
import Climate from './components/Climate'
import space from './assets/space.png'

function App() {

  return (
    <div className="App">
      <Climate />
      <img src={space} className='cli_img'/>
    </div>
  )
}

export default App
