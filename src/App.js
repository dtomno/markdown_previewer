import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './App.scss';
import Extend from './assets/icon1.svg';
import Reduce from './assets/icon2.svg';
import { marked } from "marked";
import { setText } from "./features/markdown/markdownSlice";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

marked.setOptions({
    langPrefix: "hljs language-",
    highlight: (code) => {
        return hljs.highlightAuto(code, ["html","javascript"]).value;
    }
});

const EditorAndPreviewer = () => {
    const editorText = useSelector(state => state.markdown.text);
    const editorWrapper = useRef();
    const previewer = useRef();
    const editor = useRef();
    const preview = useRef();
    const editorIcon = useRef();
    const previewerIcon = useRef();
    const dispatch = useDispatch();
    const [toggleEditor, setEditorToggle] = useState(true);
    const [togglePreviewer, setPreviewerToggle] = useState(true);
    
    const updateEditorText = (event) => {
        dispatch(setText(event.target.value));
    }

    const extendEditor = () => {
        if (toggleEditor) {
            editorIcon.current.src = Reduce;
            previewer.current.style.display = 'none';
            editor.current.style.minHeight = '95vh';
            setEditorToggle(false);
        } else {
            editorIcon.current.src = Extend;
            previewer.current.style.display = 'block';
            editor.current.style.minHeight = '200px';
            setEditorToggle(true);
        }
    };

    const extendPreviewer = () => {
        if (togglePreviewer) {
            previewerIcon.current.src = Reduce;
            editorWrapper.current.style.display = 'none';
            preview.current.style.minHeight = '95vh';
            setPreviewerToggle(false);
        } else {
            previewerIcon.current.src = Extend;
            editorWrapper.current.style.display = 'block';
            preview.current.style.minHeight = '200px';
            setPreviewerToggle(true);
        }
    };

    return (
        <>
            <div ref={editorWrapper} id="editorWrapper" className="editorWrapper">
                <div className="title-bar">
                    <p></p>
                    <p>Editor</p>
                    <img ref={editorIcon} src={Extend} alt="hide" onClick={extendEditor}/>
                </div>
                <textarea ref={editor} id="editor" onChange={(event)=>{updateEditorText(event)}} type="text" value={editorText}></textarea>
            </div>
            <div ref={previewer} id="previewerWrapper" className="previewerWrapper">
                <div className="title-bar">
                    <p></p>
                    <p>Previewer</p>
                    <img ref={previewerIcon} src={Extend} alt="hide" onClick={extendPreviewer}/>
                </div>
            <div ref={preview} id="preview" className="preview" dangerouslySetInnerHTML={{__html:marked(editorText)}}></div>
            </div>
        </>
    );
};

export const App = () => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Markdown Previewer</h1>
            <EditorAndPreviewer />
        </div>
    );
};