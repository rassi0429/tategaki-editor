import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { DocumentList } from './components/DocumentList'
import { EditorPage } from './components/EditorPage'

import * as styles from './styles/index.css'

function DocumentListPage() {
  const navigate = useNavigate()
  
  const handleSelectDocument = (id: string) => {
    navigate(`/edit/${id}`)
  }
  
  return <DocumentList onSelectDocument={handleSelectDocument} />
}

function EditorPageWrapper() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const handleBack = () => {
    navigate('/')
  }
  
  return <EditorPage documentId={id!} onBack={handleBack} />
}

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <main className={styles.appMain}>
          <Routes>
            <Route path="/" element={<DocumentListPage />} />
            <Route path="/edit/:id" element={<EditorPageWrapper />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
