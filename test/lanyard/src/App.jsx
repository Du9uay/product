import { useState } from 'react'
import SimpleLanyard from './components/SimpleLanyard'
import TestScene from './components/TestScene'
import DiagnosticComponent from './components/DiagnosticComponent'
// import Lanyard from './components/Lanyard'
import './App.css'

function App() {
  const [scene, setScene] = useState('simple');

  return (
    <div className="App">
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: 100,
        background: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '5px'
      }}>
        <button
          onClick={() => setScene('test')}
          style={{
            margin: '5px',
            padding: '5px 10px',
            background: scene === 'test' ? '#667eea' : 'white',
            color: scene === 'test' ? 'white' : 'black',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          测试场景
        </button>
        <button
          onClick={() => setScene('simple')}
          style={{
            margin: '5px',
            padding: '5px 10px',
            background: scene === 'simple' ? '#667eea' : 'white',
            color: scene === 'simple' ? 'white' : 'black',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          简单挂绳
        </button>
        <button
          onClick={() => setScene('full')}
          style={{
            margin: '5px',
            padding: '5px 10px',
            background: scene === 'full' ? '#667eea' : 'white',
            color: scene === 'full' ? 'white' : 'black',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
          disabled
          title="需要真实的card.glb文件"
        >
          完整版本(需要GLB)
        </button>
      </div>

      {scene === 'test' && <TestScene />}
      {scene === 'simple' && <SimpleLanyard />}
      {/* {scene === 'full' && <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />} */}

      <DiagnosticComponent />
    </div>
  )
}

export default App