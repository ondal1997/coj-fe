import React, { Component } from 'react';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      uploadedImages: [],
    };
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  uploadImageCallBack = (file) => {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    // Make sure you have a uploadImages: [] as your default state
    const { uploadedImages } = this.state;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };

    uploadedImages.push(imageObject);

    this.setState({ uploadedImages: uploadedImages });

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise(
      (resolve) => {
        // 서버로 이미지를 전송하고, 해당 이미지의 주소를 받아온다.
        // 클라는 fetch를 사용하면 될듯. 이미지를 인코딩해서 바디에 넣어 보낸다.
        // 서버는 디코딩으로 이미지를 얻어내고 이름을 적절히 수정하여 파일시스템에 저장한다.
        // 해당 이미지의 이름을 반환해준다...
        resolve({ data: { link: imageObject.localSrc } });
      },
    );
  };

  render() {
    const { editorState } = this.state;
    return (
        <div className="App">
        <header className="App-header">

          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { uploadCallback: this.uploadImageCallBack },
              inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel',
            }}
          />
        </header>
        </div>
    );
  }
}

export default App;
