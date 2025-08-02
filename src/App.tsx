import { useState } from 'react'
import TategakiEditor from './components/TategakiEditor'

function App() {
  const [content, setContent] = useState('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>縦書きエディタ</h1>
      </header>
      <main className="app-main">
        <TategakiEditor 
          initialContent={content}
          onChange={setContent}
        />
      </main>
    </div>
  )
}

export default App