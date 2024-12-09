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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useCallback, useMemo, useRef } from "react";
import CustomClassicEditor from "./ckeditor/ckeditor";
import { HTMLEditorProps } from "./types/types"



const HTMLEditor = (props: HTMLEditorProps) => {
  const editorRef = useRef<any>(null);

  const handleChange = useCallback(
    (e, editor) => {
      const data = editor.getData();
      if (props.onChange) {
        props.onChange(e, { name: props.name, value: data });
      }
    },
    [props.onChange]
  );

  const resizeEditor = useCallback(
    (rows?: number) => {
      if (!editorRef.current || props.expandToParent) {
        return;
      }
      let height = "200px";
      // Take given rowCount or from field
      const fieldRows = rows || (props.field?.styleProp("h") as number) || 0;
      if (fieldRows > 0) {
        height =
          70 + (fieldRows > 1 ? ((fieldRows as number) - 1) * 110 : 0) + "px";
      }
      if (!editorRef.current?.editing) {
        return;
      }
      editorRef.current.editing.view.change((writer) => {
        writer.setStyle(
          "height",
          height,
          editorRef.current.editing.view.document.getRoot()
        );
      });
    },
    [props.field]
  );

  const handleReady = useCallback((editor) => {
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

  const config: any = useMemo(
    () => ({
      toolbar: {
        shouldNotGroupWhenFull: true,
      },
      link: {
        decorators: [
          {
            mode: "manual",
            label: "Externer Link",
            attributes: {
              target: "_blank",
            },
          },
        ],
      },
    }),
    []
  );

  return (
    <>
      <CKEditor
        editor={CustomClassicEditor as any}
        data={props.value}
        onReady={handleReady}
        onChange={handleChange}
        onBlur={props.onBlur}
        // tabIndex={props.tabIndex}
        disabled={props.disabled}
        config={config}
        id={props.id}
      />
    </>
  );
};

export default HTMLEditor;

