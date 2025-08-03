export interface Document {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const STORAGE_KEY = 'tategaki-documents'

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getDocuments = (): Document[] => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []

  const docs = JSON.parse(stored)
  return docs.map((doc: Document) => ({
    ...doc,
    createdAt: new Date(doc.createdAt),
    updatedAt: new Date(doc.updatedAt),
  }))
}

export const saveDocuments = (documents: Document[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
}

export const createDocument = (title = '無題の文書'): Document => {
  const newDoc: Document = {
    id: generateUUID(),
    title,
    content: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const documents = getDocuments()
  documents.push(newDoc)
  saveDocuments(documents)

  return newDoc
}

export const updateDocument = (
  id: string,
  updates: Partial<Document>
): void => {
  const documents = getDocuments()
  const index = documents.findIndex((doc) => doc.id === id)

  if (index !== -1) {
    documents[index] = {
      ...documents[index],
      ...updates,
      updatedAt: new Date(),
    } as Document
    saveDocuments(documents)
  }
}

export const deleteDocument = (id: string): void => {
  const documents = getDocuments()
  const filtered = documents.filter((doc) => doc.id !== id)
  saveDocuments(filtered)
}

export const getDocument = (id: string): Document | null => {
  const documents = getDocuments()
  return documents.find((doc) => doc.id === id) || null
}
