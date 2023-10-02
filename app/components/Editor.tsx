"use client"
import React, { Component, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
interface EditorProps {
  placeholder: string;
  onEditorContentChange: (html: string) => void;
}

interface EditorState {
  editorHtml: string;
  theme: string;
}

class Editor extends Component<EditorProps, EditorState> {
  static modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  static formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ];

  constructor(props: EditorProps) {
    super(props);
    this.state = { editorHtml: '', theme: 'snow' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html: string) {
    this.setState({ editorHtml: html });
    // Call the callback function with the updated content
    this.props.onEditorContentChange(html);
  }

  handleThemeChange(newTheme: string) {
    if (newTheme === 'core') newTheme = 'snow';
    this.setState({ theme: newTheme });
  }

  render() {
    return (
      <div className=' bg-slate-50'>
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
        />
        
      </div>
    );
  }
}

export default Editor;



