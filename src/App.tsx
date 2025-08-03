import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { DocumentList } from './components/DocumentList'
import { EditorPage } from './components/EditorPage'

import * as styles from './styles/index.css'
import './styles/orig.css'

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

  if (!id) {
    navigate('/')
    return null
  }

  return <EditorPage documentId={id} onBack={handleBack} />
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
