'use client';

import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Type,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

type Props = {
  value: string;
  onChange: (content: string) => void;
  label?: string;
};

export function RichTextEditor({
  value,
  onChange,
  label = 'Article Body Content',
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const execCommand = (
    command: string,
    value: string | undefined = undefined,
  ) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    const url = prompt('Enter URL link:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
        {label}
      </label>

      <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-xs focus-within:border-[#035551] focus-within:ring-1 focus-within:ring-[#035551]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/80 p-2">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="rounded p-1.5 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="rounded p-1.5 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </button>
          <div className="mx-1 h-4 w-px bg-slate-300" />

          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<h2>')}
            className="rounded p-1.5 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<h3>')}
            className="rounded p-1.5 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('formatBlock', '<p>')}
            className="rounded p-1.5 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            title="Paragraph"
          >
            <Type className="h-4 w-4" />
          </button>
          <div className="mx-1 h-4 w-px bg-slate-300" />

          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="rounded p-1.5 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="rounded p-1.5 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={addLink}
            className="rounded p-1.5 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
            title="Add Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Content Editable Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="prose prose-sm min-h-[220px] max-w-none p-4 text-slate-800 focus:outline-none"
        />
      </div>
    </div>
  );
}
