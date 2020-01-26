import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold,faCode,faUnderline,faItalic,faQuoteRight,
         faListOl,faListUl,faAlignRight,faAlignLeft,
         faAlignCenter,faRedo,faUndo } from '@fortawesome/free-solid-svg-icons'
import React from "react";
import {StyleButton,DropDown} from "./Button"

import createUndoPlugin from 'draft-js-undo-plugin';

export const undoPlugin = createUndoPlugin({
  undoContent: <FontAwesomeIcon icon={faUndo} />,
  redoContent: <FontAwesomeIcon icon={faRedo} />,
});


  const BLOCK_TYPES = [

    {label: <FontAwesomeIcon icon={faQuoteRight} />, style: 'blockquote'},
    {label: <FontAwesomeIcon icon={faListUl} />, style: 'unordered-list-item'},
    {label: <FontAwesomeIcon icon={faListOl} />, style: 'ordered-list-item'},
    {label: 'Code', style: 'code-block'},

  ];

const DROP_BLOCK_TYPES=[
  {label: 'Heading', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'P', style: 'paragraph'},
];


  export const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls RichEditor-block">

         <form>
           <select>
          {DROP_BLOCK_TYPES.map((type)=>
           <DropDown
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
          />)}
          </select>
        </form>

          {BLOCK_TYPES.map((type) =>

            <StyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />

          )}


      </div>
    );
  };






  var INLINE_STYLES = [
    {label: <FontAwesomeIcon icon={faBold} />, style: 'BOLD'},
    {label: <FontAwesomeIcon icon={faItalic} />, style: 'ITALIC'},
    {label: <FontAwesomeIcon icon={faUnderline} />, style: 'UNDERLINE'},
    {label: <FontAwesomeIcon icon={faCode} />, style: 'CODE'},
    {label: <FontAwesomeIcon icon={faAlignRight} />, style: 'RIGHT'},
    {label: <FontAwesomeIcon icon={faAlignCenter} />, style: 'CENTER'},

  ];

  export const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
      <div className="RichEditor-controls RichEditor-inline">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };
