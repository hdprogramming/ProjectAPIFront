import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import {TextStyle} from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Emoji from '@tiptap/extension-emoji';
import { Paragraph } from '@tiptap/extension-paragraph';
import './styles.css';
// İkonları import ediyoruz
import {
  FaBold, FaItalic, FaUnderline, FaStrikethrough,
  FaSuperscript, FaSubscript, FaAlignLeft, FaAlignCenter,
  FaAlignRight, FaAlignJustify,
  FaImage, FaSmile
} from 'react-icons/fa';
import { TbLetterCaseToggle } from 'react-icons/tb';


// --- Satır Yüksekliği Eklentisi (Öncekiyle aynı) ---
const CustomLineHeight = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      lineHeight: {
        default: null,
        parseHTML: (element) => element.style.lineHeight,
        renderHTML: (attributes) => {
          if (!attributes.lineHeight) return {};
          return { style: `line-height: ${attributes.lineHeight}` };
        },
      },
    };
  },
  addCommands() {
    return {
      ...this.parent?.(),
      setLineHeight: (lineHeight) => ({ commands }) => {
        return commands.updateAttributes(this.name, { lineHeight });
      },
    };
  },
});

// --- MenuBar Bileşeni (Güncellendi) ---
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  // Fonksiyonlara (e) parametresi eklendi ve preventDefault() çağrıldı
  const addImage = (e) => {
    e.preventDefault(); // Eklendi
    const url = window.prompt('Görsel URL adresini girin:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  // Fonksiyonlara (e) parametresi eklendi ve preventDefault() çağrıldı
  const toggleCase = (e) => {
    e.preventDefault(); // Eklendi
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, ' ');
    const newText = text === text.toLowerCase() ? text.toUpperCase() : text.toLowerCase();
    editor.chain().focus().deleteRange({ from, to }).insertContent(newText).run();
  };
  const getActiveHeading = () => {
    if (editor.isActive('heading', { level: 1 })) {
      return 'h1';
    }
    if (editor.isActive('heading', { level: 2 })) {
      return 'h2';
    }
    if (editor.isActive('heading', { level: 3 })) {
      return 'h3';
    }
    if (editor.isActive('heading', { level: 4 })) {
      return 'h4';
    }
    if (editor.isActive('heading', { level: 5 })) {
      return 'h5';
    }
    return 'p'; // Varsayılan paragraf
  };
  return (
    <div className="menu-bar">
      {/* Satır içi onClick'ler (e) alacak şekilde güncellendi */}
      <select
        value={editor.getAttributes('textStyle').fontFamily || 'sans-serif'}
        onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
      >
        <option value="sans-serif">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
      </select>
      <select
        value={getActiveHeading()}
        onChange={(e) => {
          const value = e.target.value;
          if (value === 'p') editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: parseInt(value.replace('h', '')) }).run();
        }}
      >
        <option value="p">Paragraf</option>
        <option value="h1">Başlık 1</option>
        <option value="h2">Başlık 2</option>
         <option value="h3">Başlık 3</option>
          <option value="h4">Başlık 4</option>
           <option value="h5">Başlık 5</option>
      </select>
        <select
        value={editor.getAttributes('paragraph').lineHeight || 'normal'}
        onChange={(e) => editor.chain().focus().setLineHeight(e.target.value).run()}
      >
        <option value="normal">Satır Yüksekliği</option>
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
      </select>

      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} className={editor.isActive('bold') ? 'is-active' : ''} title="Kalın"><FaBold /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} className={editor.isActive('italic') ? 'is-active' : ''} title="İtalik"><FaItalic /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }} className={editor.isActive('underline') ? 'is-active' : ''} title="Altı Çizili"><FaUnderline /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleStrike().run(); }} className={editor.isActive('strike') ? 'is-active' : ''} title="Üstü Çizili"><FaStrikethrough /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleSuperscript().run(); }} className={editor.isActive('superscript') ? 'is-active' : ''} title="Üst Simge"><FaSuperscript /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().toggleSubscript().run(); }} className={editor.isActive('subscript') ? 'is-active' : ''} title="Alt Simge"><FaSubscript /></button>
      
      
       <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('left').run(); }} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''} title="Sola Hizala"><FaAlignLeft /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('center').run(); }} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''} title="Ortala"><FaAlignCenter /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('right').run(); }} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''} title="Sağa Hizala"><FaAlignRight /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('justify').run(); }} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''} title="Yasla"><FaAlignJustify /></button>
      

      {/* Diğer butonlar güncellendi */}
      <button onClick={addImage} title="Görsel Ekle"><FaImage /></button>
      <button onClick={(e) => { e.preventDefault(); editor.chain().focus().insertContent('😊').run(); }} title="Emoji Ekle"><FaSmile /></button>
      <button onClick={toggleCase} title="Büyük/Küçük Harf"><TbLetterCaseToggle /></button>
   </div>
  );
};

// --- Modal İçindeki Editör Bileşeni (Güncellendi) ---
const EditorComponent = ({ initialContent, onClose, onSave }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ paragraph: false }),
      CustomLineHeight,
      Underline,
      Superscript,
      Subscript,
      TextStyle,
      FontFamily,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image,
      Emoji.configure({ enableEmoticonSupport: true }),
    ],
    content: initialContent,
  });

  // Fonksiyona (e) parametresi eklendi ve preventDefault() çağrıldı
  const handleSave = (e) => {
    e.preventDefault(); // Eklendi
    if (editor) {
      onSave(editor.getHTML());
    }
  };

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <div className="modal-actions">
        {/* İptal butonu güncellendi */}
        <button onClick={(e) => { e.preventDefault(); onClose(); }}>İptal</button>
        {/* Kaydet butonu güncellendi (handleSave fonksiyonu artık e'yi alıyor) */}
        <button onClick={handleSave} className="btn-save">Kaydet ve Kapat</button>
      </div>
    </>
  );
};


// --- Ana Modal Bileşeni (Değişiklik yok) ---
function EditorModal({ isOpen, onClose, onSave, initialContent }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <EditorComponent 
          initialContent={initialContent}
          onClose={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  );
}

export default EditorModal;