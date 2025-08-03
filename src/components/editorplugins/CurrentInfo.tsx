import { useEffect, useState } from 'react';
import { $getRoot, $getSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

function CurrentInfo() {
  const [editor] = useLexicalComposerContext();
  const [characterCount, setCharacterCount] = useState(0);
  const [lineCount, setLineCount] = useState(0)

  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const root = $getRoot();
        const textContent = root.getTextContent();
        setCharacterCount(textContent.length);
        setLineCount(textContent.split("\n").length)
      });
    });

    editor.getEditorState().read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      const _lineCount = textContent.split("\n").length
      setCharacterCount(textContent.length);
      setLineCount(_lineCount)
    });

    return () => {
      removeUpdateListener();
    };
  }, [editor]);

  return <div style={{ position: "fixed", bottom: 0, left: 0 }}>文字数: {characterCount} 行数: {lineCount}</div>;
}

export default CurrentInfo