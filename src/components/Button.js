import React from "react";

export class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }

      return (
        <div className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </div>
      );
    }
  };

  export class DropDown extends React.Component{
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }

      return (
        <option className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </option>
      );
    }
  };
