import {EditorState,RichUtils, getDefaultKeyBinding} from "draft-js";
import React  from "react";
import "draft-js/dist/Draft.css";
import "../style/editor.css";
import "draft-js-undo-plugin/lib/plugin.css";
import "draft-js-anchor-plugin/lib/plugin.css"
import "draft-js-inline-toolbar-plugin/lib/plugin.css"
import {BlockStyleControls,InlineStyleControls,undoPlugin} from "./Tools";
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import Editor from 'draft-js-plugins-editor';
import createLinkPlugin from 'draft-js-anchor-plugin';
import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';
const {UndoButton, RedoButton} =undoPlugin;

const linkPlugin = createLinkPlugin({
  placeholder: 'http://…'
});
const inlineToolbarPlugin = createInlineToolbarPlugin();

const { InlineToolbar } = inlineToolbarPlugin;

class RichEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {editorState: EditorState.createEmpty()};

      this.focus = () => this.refs.editor.focus();
      this.onChange = (editorState) => this.setState({editorState});

      this.handleKeyCommand = this._handleKeyCommand.bind(this);
      this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
      this.toggleBlockType = this._toggleBlockType.bind(this);
      this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }

    _handleKeyCommand(command, editorState) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }

    _mapKeyToEditorCommand(e) {
      if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          e,
          this.state.editorState,
          4, /* maxDepth */
        );
        if (newEditorState !== this.state.editorState) {
          this.onChange(newEditorState);
        }
        return;
      }
      return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }

    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }

    render() {
      const {editorState} = this.state;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      let className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }

      return (
          <div className="root">
        <div className="RichEditor-root">
          <div className="RichEditor-tools">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          {/* <Link editorRef={this.refs.editor} editorState={editorState} onToggle={this.toggleInlineStyle}/> */}
          </div>
          <div className={className} onClick={this.focus}>
            <Editor
              spellCheck={false}
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder="Tell a story..."
              ref="editor"
              plugins={[undoPlugin,linkPlugin,inlineToolbarPlugin]}
            />
            <InlineToolbar>
                  {
                  // may be use React.Fragment instead of div to improve perfomance after React 16
                  (externalProps) => (
                    <div>
                      <BoldButton {...externalProps} />
                      <ItalicButton {...externalProps} />
                      <UnderlineButton {...externalProps} />
                      <linkPlugin.LinkButton {...externalProps} />
                    </div>
                  )
                } 
            </InlineToolbar>
            <UndoButton/> 
            <RedoButton/>
            
          </div>
        </div>
        </div>
      );
    }
  }

  // Custom overrides for "code" style.




  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
      color:"#ff1111",
    },
    RIGHT:{
        textAlign:"right",
        float:"right",
    },
    CENTER:{
        textAlign:"center",
        
    },
    LEFT:{
        textAlign:"left",
        float:"left",
    }
  };

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }



  


export default RichEditor;
