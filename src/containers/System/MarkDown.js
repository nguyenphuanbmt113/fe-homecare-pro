import MarkdownIt from "markdown-it";
import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { connect } from "react-redux";
const mdParser = new MarkdownIt();
// import "./MarkDown.scss";
class MarkDown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleEditorChange = ({ html, text }) => {
    this.props.setContent(html, text);
  };
  render() {
    return (
      <div className="">
        <MdEditor
          style={{ height: "400px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.props?.contentMarkdown || ""}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkDown);
