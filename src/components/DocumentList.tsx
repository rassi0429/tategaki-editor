import React, { useState, useEffect } from 'react';
import { Document, getDocuments, createDocument, deleteDocument } from '../utils/documentManager';
import * as styles from './DocumentList.css';

interface DocumentListProps {
  onSelectDocument: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ onSelectDocument }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = () => {
    setDocuments(getDocuments());
  };

  const handleCreateNew = () => {
    const newDoc = createDocument('新しい文書');
    onSelectDocument(newDoc.id);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('この文書を削除してもよろしいですか？')) {
      deleteDocument(id);
      loadDocuments();
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>縦書きエディタ - 文書一覧</h1>
        <button className={styles.newButton} onClick={handleCreateNew}>
          新規作成
        </button>
      </div>

      {documents.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyStateTitle}>文書がありません</h2>
          <p className={styles.emptyStateText}>
            「新規作成」ボタンをクリックして、最初の文書を作成しましょう。
          </p>
          <button className={styles.newButton} onClick={handleCreateNew}>
            最初の文書を作成
          </button>
        </div>
      ) : (
        <div className={styles.documentGrid}>
          {documents.map((doc) => (
            <div
              key={doc.id}
              className={styles.documentCard}
              onClick={() => onSelectDocument(doc.id)}
            >
              <button
                className={styles.deleteButton}
                onClick={(e) => handleDelete(e, doc.id)}
              >
                削除
              </button>
              <h3 className={styles.documentTitle}>{doc.title}</h3>
              <p className={styles.documentMeta}>
                作成: {formatDate(doc.createdAt)}
              </p>
              <p className={styles.documentMeta}>
                更新: {formatDate(doc.updatedAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};