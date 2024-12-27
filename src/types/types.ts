/*
 *  -----------------------------------------------------------------------------------------
 *  types.ts
 *
 *  Copyright: (c) 2004-2024 Potthoff + Partner Unternehmensberatungs-Gesellschaft mbH
 *             All rights reserved.
 *  -----------------------------------------------------------------------------------------
 *  Erstellt : 09.12.2024
 *  Autor    : Marwan Esmaail
 *
 *  Geändert : 27.12.2024
 *       von : Marwan Esmaail
 *  -----------------------------------------------------------------------------------------
 *
 *  Changelog:
 *
 */

// Generated by dts-bundle-generator v8.1.2
import { CFormField } from "../../../kos-types";
import { IFormComment } from "../../../kos-types";

export interface HTMLEditorProps extends AbstractFieldProps<any> {
  className?: string;
  error?: any;
  tabIndex?: number;
  setEditorRef?: (editorRef) => void;
  setResizeEditor?: (resize) => void;
  focusOnLoad?: boolean;
  expandToParent?: boolean;
}

export interface GenericFieldProps {
  field?: CFormField | undefined;
  label?: JSX.Element | string;
  comment?: IFormComment | null | undefined; // comment handles error state
  tooltip?: JSX.Element | string | undefined;
  description?: string | undefined;
  className?: string;
  labelClassName?: string;
  required?: boolean;
}
export type AbstractFieldProps<T> = {
  name?: string;
  id?: string;
  layoutMode?: boolean; // Should field show dummy input only?
  value?: T;
  onChange?: (e, data) => void;
  onBlur?: (e, data) => void;
  disabled?: boolean;
  options?: any;
  tabIndex?: number;
  placeholder?: string | undefined;
} & GenericFieldProps;
