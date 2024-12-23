/*  * -----------------------------------------------------------------------------------------
 * index.tsx
 *
 * Copyright: (c) 2004-2024 Potthoff + Partner Unternehmensberatungs-Gesellschaft mbH
 *            All rights reserved.
 * -----------------------------------------------------------------------------------------
 * Erstellt : 12.12.2024
 * Autor    : Marwan Esmaail
 *
 * Geändert : 23.12.2024
 *      von : Marwan Esmaail
 * -----------------------------------------------------------------------------------------
 *
 * Changelog:
 *
 */

import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useCallback, useMemo, useRef } from "react";
import Editor from "./ckeditor/ckeditor";
import { HTMLEditorProps } from "./types/types";
import { EventInfo } from "@ckeditor/ckeditor5-utils";

const HTMLEditor = (props: HTMLEditorProps) => {
  const editorRef = useRef<Editor | null>(null);

  const handleChange = useCallback(
    (event: EventInfo<"change:data">, editor: Editor) => {
      const data = editor.getData();
      if (props.onChange) {
        props.onChange(event, { name: props.name, value: data });
      }
    },
    [props.onChange, props.name]
  );

  const resizeEditor = useCallback(
    (rows?: number) => {
      if (!editorRef.current || props.expandToParent) return;

      const fieldRows = rows || (props.field?.styleProp("h") as number) || 0;
      const height =
        fieldRows > 0
          ? `${70 + (fieldRows > 1 ? (fieldRows - 1) * 110 : 0)}px`
          : "200px";

      const root = editorRef.current.editing?.view.document.getRoot();

      if (root) {
        editorRef.current.editing?.view.change((writer) => {
          writer.setStyle("height", height, root);
        });
      }
    },
    [props.field, props.expandToParent]
  );

  const handleReady = useCallback(
    (editor: any) => {
      editorRef.current = editor;
      console.log("editor is loaded", editor);
      console.log("editor ref", editorRef);

      if (props.setEditorRef) props.setEditorRef(editor);
      resizeEditor();
      if (props.focusOnLoad) editor.editing.view.focus();
      if (props.setResizeEditor) props.setResizeEditor(resizeEditor);
    },
    [props.setEditorRef, props.focusOnLoad, props.setResizeEditor, resizeEditor]
  );

  const config: any = useMemo(
    () => ({
      toolbar: {
        shouldNotGroupWhenFull: true
      },
      language: "de",
      link: {
        decorators: [
          {
            mode: "manual",
            label: "Externer Link",
            attributes: {
              target: "_blank",
              rel: "noopener noreferrer"
            }
          }
        ]
      }
    }),
    []
  );

  return (
    <CKEditor
      editor={Editor}
      data={props.value}
      onReady={handleReady}
      onChange={handleChange}
      onBlur={props.onBlur}
      disabled={props.disabled}
      config={config}
      id={props.id}
    />
  );
};

export default HTMLEditor;
