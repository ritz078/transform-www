import * as data from "@constants/data";
import { useSessionStorage } from "@hooks/useSessionStorage";

export type Language =
  | "svg"
  | "html"
  | "json"
  | "javascript"
  | "css"
  | "plaintext"
  | "sql"
  | "yaml"
  | "xml"
  | "markdown";

export function useData(type: Language) {
  return type ? useSessionStorage(`data:${type}`, data[type]) : [,];
}
