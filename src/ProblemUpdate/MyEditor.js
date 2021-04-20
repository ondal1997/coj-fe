import { CKEditor } from '@ckeditor/ckeditor5-react';

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';

import ListStyle from '@ckeditor/ckeditor5-list/src/liststyle';
import Font from '@ckeditor/ckeditor5-font/src/font';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';

import Link from '@ckeditor/ckeditor5-link/src/link';

import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import LinkImage from '@ckeditor/ckeditor5-link/src/linkimage';
import ImageInsert from '@ckeditor/ckeditor5-image/src/imageinsert';

import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';

import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import { useEffect, useRef, useState } from 'react';

// import { Paper } from '@material-ui/core';

const editorConfiguration = {
  plugins: [Essentials, Paragraph, Heading,
    Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
    ListStyle, Font, BlockQuote, HorizontalLine, Link,
    Image, ImageResize, LinkImage, ImageInsert, SimpleUploadAdapter,
    Table, TableToolbar,
  ],
  simpleUpload: {
    uploadUrl: 'https://codersit.co.kr/coders/upload.php',
  },
  toolbar: ['heading', '|', 'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
    '|', 'bulletedList', 'numberedList', '|', 'fontSize', 'fontColor', 'fontBackgroundColor', '|', 'blockQuote', 'horizontalLine', '|', 'link', 'insertImage', 'insertTable', '|', 'undo', 'redo'],
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  placeholder: '여기에 내용을 입력하세요',
};

const MyEditor = ({ value, onChange }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      if (value !== ref.current.editor.getData()) {
        ref.current.editor.setData(value);
      }
    }
  }, [isLoaded, value]);

  return (
    <>
      <CKEditor
        // height={500}
        editor={ClassicEditor}
        config={editorConfiguration}
        // data={value}
        onReady={() => {
          setIsLoaded(true);
        }}
        ref={ref}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
      {/* <Paper className="ck-content" elevation={2}
      style={{ backgroundColor: '#ECECED', padding: '1%', marginTop: '1%' }}>
      </Paper> */}
    </>
  );
};

export default MyEditor;
