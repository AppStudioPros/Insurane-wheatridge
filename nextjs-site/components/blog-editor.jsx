'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Youtube from '@tiptap/extension-youtube'
import { useRef, useEffect } from 'react'
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Image as ImageIcon, Link as LinkIcon, Youtube as YoutubeIcon,
  Quote, Minus, Undo, Redo, Type, Plus
} from 'lucide-react'

const BLOCK_TEMPLATES = [
  { label: 'Call to Action', icon: '🔗', html: '<div class="cta-block" style="background:#eff6ff;border-radius:12px;padding:24px;text-align:center;margin:16px 0"><h3>Ready to Get Protected?</h3><p>Contact us today for a free insurance review.</p><p><strong><a href="/contact">Get a Free Quote →</a></strong></p></div>' },
  { label: 'Info Box', icon: '💡', html: '<blockquote style="background:#f0fdf4;border-left:4px solid #22c55e;padding:16px;border-radius:8px;margin:16px 0"><p><strong>💡 Tip:</strong> Enter your tip here...</p></blockquote>' },
  { label: 'Warning Box', icon: '⚠️', html: '<blockquote style="background:#fefce8;border-left:4px solid #eab308;padding:16px;border-radius:8px;margin:16px 0"><p><strong>⚠️ Important:</strong> Enter important info here...</p></blockquote>' },
  { label: 'FAQ Item', icon: '❓', html: '<h3>Question goes here?</h3><p>Answer goes here. Provide a detailed, helpful response.</p><hr />' },
  { label: 'Section Divider', icon: '➖', html: '<hr />' },
]

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded hover:bg-gray-200 transition ${active ? 'bg-blue-100 text-[#0954a5]' : 'text-gray-600'}`}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor, onImageUpload }) {
  const fileRef = useRef(null)

  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
  }

  const addYoutube = () => {
    const url = window.prompt('Enter YouTube URL:')
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run()
  }

  const addImage = () => fileRef.current?.click()

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await onImageUpload(file)
    if (url) editor.chain().focus().setImage({ src: url }).run()
    e.target.value = ''
  }

  const insertBlock = (html) => {
    editor.chain().focus().insertContent(html).run()
  }

  const s = 15

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-0.5 items-center bg-gray-50 rounded-t-lg sticky top-0 z-10 overflow-visible">
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
        <Bold size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
        <Italic size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
        <UnderlineIcon size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
        <Strikethrough size={s} />
      </ToolbarButton>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')} title="Paragraph">
        <Type size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">
        <Heading1 size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">
        <Heading2 size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">
        <Heading3 size={s} />
      </ToolbarButton>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
        <List size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
        <ListOrdered size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote">
        <Quote size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
        <Minus size={s} />
      </ToolbarButton>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
        <AlignLeft size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
        <AlignCenter size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
        <AlignRight size={s} />
      </ToolbarButton>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={addImage} title="Insert Image">
        <ImageIcon size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Insert Link">
        <LinkIcon size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={addYoutube} title="Embed YouTube">
        <YoutubeIcon size={s} />
      </ToolbarButton>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Insert block dropdown */}
      <div className="relative group">
        <button type="button" className="p-1.5 rounded hover:bg-gray-200 transition text-gray-600 flex items-center gap-1 text-xs font-medium" title="Insert Block">
          <Plus size={s} /> <span className="hidden sm:inline">Insert</span>
        </button>
        <div className="absolute right-0 bottom-full mb-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 w-52 hidden group-hover:block z-50">
          {BLOCK_TEMPLATES.map((block, i) => (
            <button
              key={i}
              type="button"
              onClick={() => insertBlock(block.html)}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <span>{block.icon}</span> {block.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-px h-5 bg-gray-300 mx-1" />

      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
        <Undo size={s} />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
        <Redo size={s} />
      </ToolbarButton>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}

export default function BlogEditor({ content, onChange, onImageUpload }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Start writing your blog post...' }),
      Youtube.configure({ width: 640, height: 360 }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose max-w-none p-4 min-h-[400px] focus:outline-none',
      },
    },
  })

  // Sync content when editing an existing post
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content && !editor.isFocused) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-visible relative">
      <Toolbar editor={editor} onImageUpload={onImageUpload} />
      <EditorContent editor={editor} />
    </div>
  )
}
