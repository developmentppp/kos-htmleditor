"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/*
 * -----------------------------------------------------------------------------------------
 * HTMLEditor.tsx
 *
 * Copyright: (c) 2004-2021 Potthoff + Partner Unternehmensberatungs-Gesellschaft mbH
 *            All rights reserved.
 * -----------------------------------------------------------------------------------------
 * Erstellt : 26.11.2021
 * Autor    : Markus Plutka
 *
 * Geändert : 04.12.2024
 *      von : Marwan Esmaail
 * -----------------------------------------------------------------------------------------
 *
 * Changelog:
 *
 */
var ckeditor5_react_1 = require("@ckeditor/ckeditor5-react");
var react_1 = __importStar(require("react"));
var ckeditor_1 = __importDefault(require("./ckeditor/ckeditor"));
var HTMLEditor = function (props) {
    var editorRef = (0, react_1.useRef)(null);
    var handleChange = (0, react_1.useCallback)(function (e, editor) {
        var data = editor.getData();
        if (props.onChange) {
            props.onChange(e, { name: props.name, value: data });
        }
    }, [props.onChange]);
    var resizeEditor = (0, react_1.useCallback)(function (rows) {
        var _a, _b;
        if (!editorRef.current || props.expandToParent) {
            return;
        }
        var height = "200px";
        // Take given rowCount or from field
        var fieldRows = rows || ((_a = props.field) === null || _a === void 0 ? void 0 : _a.styleProp("h")) || 0;
        if (fieldRows > 0) {
            height =
                70 + (fieldRows > 1 ? (fieldRows - 1) * 110 : 0) + "px";
        }
        if (!((_b = editorRef.current) === null || _b === void 0 ? void 0 : _b.editing)) {
            return;
        }
        editorRef.current.editing.view.change(function (writer) {
            writer.setStyle("height", height, editorRef.current.editing.view.document.getRoot());
        });
    }, [props.field]);
    var handleReady = (0, react_1.useCallback)(function (editor) {
        editorRef.current = editor;
        if (props.setEditorRef) {
            props.setEditorRef(editor);
        }
        resizeEditor();
        if (props.focusOnLoad) {
            editor.editing.view.focus();
        }
        if (props.setResizeEditor) {
            props.setResizeEditor(resizeEditor);
        }
    }, []);
    var config = (0, react_1.useMemo)(function () { return ({
        toolbar: {
            shouldNotGroupWhenFull: true
        },
        link: {
            decorators: [
                {
                    mode: "manual",
                    label: "Externer Link",
                    attributes: {
                        target: "_blank"
                    }
                },
            ]
        }
    }); }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(ckeditor5_react_1.CKEditor, { editor: ckeditor_1["default"], data: props.value, onReady: handleReady, onChange: handleChange, onBlur: props.onBlur, 
            // tabIndex={props.tabIndex}
            disabled: props.disabled, config: config, id: props.id })));
};
exports["default"] = HTMLEditor;
