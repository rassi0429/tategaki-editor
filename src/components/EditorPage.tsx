import React, { useState, useEffect } from 'react';
import TategakiEditor from './TategakiEditor';
import { getDocument, updateDocument } from '../utils/documentManager';
import * as styles from './EditorPage.css';

interface EditorPageProps {
  documentId: string;
  onBack: () => void;
}

export const EditorPage: React.FC<EditorPageProps> = ({ documentId, onBack }) => {
  const [document, setDocument] = useState<any>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const doc = getDocument(documentId);
    if (doc) {
      setDocument(doc);
      setTitle(doc.title);
    }
  }, [documentId]);

  const handleSave = (content: string) => {
    updateDocument(documentId, { content, title });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateDocument(documentId, { title: e.target.value });
  };

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          一覧
        </button>
        <input
          type="text"
          className={styles.titleInput}
          value={title}
          onChange={handleTitleChange}
          placeholder="文書のタイトル"
        />
      </div>
      <TategakiEditor 
        initialContent={document.content}
        onSave={handleSave}
      />
    </div>
  );
};