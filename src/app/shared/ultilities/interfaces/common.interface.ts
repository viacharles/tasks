import { ELoadingStatus, ESide, ESortMethod } from "../enums/common.enum";

export interface IArticle {
  title: string;
  content?: string;
}

/** 顏色字串 */
export type IColorString = string;

/** 選項通用 */
export interface IOption<T = (string | number)> {
  code: T;
  name: string;
  icon?: string;
  isSelect?: boolean,
  show?: boolean,
  [key: string]: any;
}

export interface IIcon {
  color: string;
  hoverColor?: string;
  iconCode: any;
  title?: string;
  order?: number;
}

export interface ILabel {
  backgroundColor: string;
  textColor: string;
  backgroundHoverColor?: string;
  textHoverColor?: string;
  iconCode?: any;
  title?: string;
  order?: number;
}

export interface IPosition {
  isLeft: boolean;
  x: number;
  isTop: boolean;
  y: number;
}

export type ITimeUnitName = 'date' | 'week' | 'month' | 'year';

export interface IFile {
  url: string;
  name: string;
  id: string;
  status: ELoadingStatus;
}

/** 範圍日期 : yyyy/MM/dd */
export interface IRangeDate {
  start: string,
  end: string,
}

/**
 * @description 排序結果
 */
export interface ISortResult<T> {
  data: T[],
  type: ESortMethod,
}

/** 對齊位置 */
export interface IAlign {
  /** 水平 */
  x: {
    side?: ESide.Left | ESide.Right,
    diff?: number
  };
  /** 垂直 */
  y: {
    side?: ESide.Top | ESide.Bottom,
    diff?: number
  };
}
