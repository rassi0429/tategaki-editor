import { useState } from 'react'
import TategakiEditor from './components/TategakiEditor'

function App() {
  const [content, setContent] = useState('')

  return (
    <div className="app">
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
