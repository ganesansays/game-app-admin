import React from 'react';
import {Editor, EditorState, ContentState } from 'draft-js';
import './UniCodeEditor.css';

class UniCodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createWithContent(ContentState.createFromText(this.props.text ? this.props.text : "")),
        propagate: props.propagate
    };
  }

  onChange(editorState) {
    this.setState({editorState});
    this.state.propagate(editorState.getCurrentContent().getPlainText());
  }

  render() {
    return <Editor editorState={this.state.editorState} onChange={this.onChange.bind(this)} />;
  }
}

export default UniCodeEditor;