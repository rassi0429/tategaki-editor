import { useState } from 'react'
import TategakiEditor from './components/TategakiEditor'
import { usePersistent } from './hooks/usePersistent'

import * as styles from './styles/index.css'
import "./styles/orig.css"

function App() {
  const [content, setContent] = usePersistent('tategaki-content', "")

  return (
    <div className={styles.app}>
      <main className={styles.appMain}>
        <TategakiEditor
          initialEditorState={content}
          onChange={setContent}
        />
      </main>
    </div>
  )
}

export default App
