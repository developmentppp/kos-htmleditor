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
 * Geändert : 27.12.2024
 *      von : Marwan Esmaail
 * -----------------------------------------------------------------------------------------
 *
 * Changelog:
 *
 */

import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useCallback, useMemo, useRef } from "react";
import Editor from "./ckeditor/ckeditor";
import { EventInfo } from "@ckeditor/ckeditor5-utils";
import { HTMLEditorProps } from "./types/types";

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
      // Ensure editorRef.current is defined and props.expandToParent is false
      if (!editorRef.current || props.expandToParent) {
        return;
      }

      // Calculate height
      let height = "200px";
      const fieldRows = rows || (props.field?.styleProp("h") as number) || 0;
      if (fieldRows > 0) {
        height = `${70 + (fieldRows - 1) * 110}px`;
      }

      // Safely use editorRef.current with a non-null assertion
      const editorInstance = editorRef.current!;

      // Safeguard access to editing.view
      if (editorInstance.editing?.view) {
        editorInstance.editing.view.change((writer) => {
          const domRoot = editorInstance.editing.view.domRoots.get("main");

          if (domRoot) {
            domRoot.style.height = height;
          } else {
            console.warn("domRoot not found for the editor.");
          }
        });
      }
    },
    [props.field, props.expandToParent]
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
