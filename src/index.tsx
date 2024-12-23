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
        const domRoot = editorRef.current.editing.view.domRoots.get("main");
        if (domRoot) {
          domRoot.style.height = height;
        } else {
          console.warn("domRoot not found for the editor.");
        }
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
    const toolbarElement = editorRef.current?.ui.view.toolbar.element;
    const parentElement = toolbarElement.closest(".ck-editor__top");
    console.log("Bold Command State:", editor.commands.get("bold")?.isEnabled);
    console.log(
      "Italic Command State:",
      editor.commands.get("italic")?.isEnabled
    );
    console.log(
      "Underline Command State:",
      editor.commands.get("underline")?.isEnabled
    );
  }, []);

  const config: any = useMemo(
    () => ({
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "findAndReplace",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "fontSize",
          "|",
          "alignment",
          "|",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "numberedList",
          "bulletedList",
          "listStyle"
        ],
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
