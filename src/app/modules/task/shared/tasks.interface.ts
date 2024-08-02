import { EFormMode } from "@shared/ultilities/enums/common.enum";
import { EInputType, EState } from "./tasks.enum";

export interface ICard {
  id: string,
  /** 編輯模式 */
  mode: EFormMode,
  show: boolean,
  state: EState,
  /** yyyy-MM-dd hh:mm:ss */
  createTime: string,
  title: string,
  content: string
}

export interface IFilter {
  state: EState,
  inputType: EInputType,
  input: string,
  startTime: string, // yyyy/MM/dd
  endTime: string // yyyy/MM/dd
}
