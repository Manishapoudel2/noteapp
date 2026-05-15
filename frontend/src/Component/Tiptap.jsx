import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { BiSolidArrowToLeft, BiSolidArrowToRight } from "react-icons/bi";
import { CgArrowAlignH } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'

const Tiptap = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  if (!editor) return null

  return (
    <div className='border border-gray-400 rounded' >
      <div className='flex w-full border-b border-b-gray-400 gap-2 py-1 items-center  '>

        <div className='border-r border-r-gray-300 ml-2 h-4 flex items-center gap-1'>
          <button onClick={() => editor.chain().focus().toggleBold().run()} className=' shadow-medium bg-white h-4 flex items-center justify-center rounded-xs  text-xs font-semibold p-1'>
            B
          </button>

          <button onClick={() => editor.chain().focus().toggleItalic().run()} className=' shadow-medium bg-white h-4 flex items-center justify-center rounded-xs  text-xs  p-1'>
            <em>  I</em>
          </button>

          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className=' mr-1 h-4 flex items-center justify-center shadow-medium bg-white rounded-xs  text-xs font-semibold  p-1'>
            H2
          </button>
        </div>

        <div className='border-r border-r-gray-300 h-4 flex items-center gap-1 '>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className=' h-4 flex items-center justify-center shadow-medium bg-white rounded-xs text-xs text-gray-600  p-1'>
            . List
          </button>

          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className=' mr-1 h-4 flex items-center justify-center shadow-medium  bg-white rounded-xs text-xs text-gray-600  p-1'>
            1. List
          </button>

        </div>

        <div className='border-r border-r-gray-300 h-4 flex items-center gap-1 '>
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className=' h-4 flex items-center justify-center shadow-medium bg-white rounded-xs  text-xs font-semibold  p-1'>
            <BiSolidArrowToLeft />
          </button>

          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className=' h-4 flex items-center justify-center shadow-medium bg-white rounded-xs  text-xs font-semibold  p-1'>
            <CgArrowAlignH />
          </button>

          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className=' h-4 flex items-center justify-center mr-1  shadow-medium bg-white rounded-xs  text-xs font-semibold  p-1'>
            <BiSolidArrowToRight />
          </button>
        </div>
        <button onClick={() => editor.chain().focus().setColor('#000000').run()} className=' h-4 flex items-center justify-center shadow-medium bg-white rounded-xs  text-xs font-semibold  p-1'>
          A
        </button>
        <button onClick={() => editor.chain().focus().setColor('#ff0000').run()} className=' text-red-600 h-4 flex items-center justify-center shadow-medium bg-white rounded-xs  text-xs font-semibold  p-1'>
          A
        </button>
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className='h-4 flex items-center justify-center rounded-xs shadow-medium bg-white  text-xs font-semibold  p-1'
        >
          <RxCross2 />

        </button>

      </div>

      <EditorContent
        editor={editor}
        className="shadow-medium   bg-white p-3 [&_.ProseMirror]:outline-none min-h-38 rounded-b-sm"
      />
    </div>
  )
}

export default Tiptap