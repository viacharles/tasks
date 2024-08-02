
/** 表單目的 */
export enum EFormMode {
  EDIT = 'edit',
  VIEW = 'view',
  ADD = 'new',
  REVIEW = 'review',
  NULL = 'null',
}

/** 行為 */
export enum EAction {
  Add = 'add',
  Delete = 'delete',
  Clear = 'clear',
  Close = 'close',
  Cancel = 'cancel',
  Modify = 'modify',
  View = 'view',
}

/** 回應目的 */
export enum EFeedbackType {
  Success = 'success',
  Error = 'error',
  Info = 'inform',
  Warn = 'warn',
  Paused = 'paused',
  NoResponse = 'noResponse',
  Timeout = 'timeout',
}

/** 樣式種類 */
export enum EColorType {
  /** 主色 */
  Primary = 'primary',
  /** 副色 */
  Secondary = 'secondary',
  /** 警示色 */
  Warn = 'warn',
  /** 無色 */
  Default = 'default',
}

export enum ELoadingStatus {
  Loading = 0,
  Finished,
  Empty,
  Error,
}

/** 欄位狀態 */
export enum EFieldStatus {
  /** 輸入中 */
  Inputting = 0,
  /** 已選取 */
  Checked,
  /** api loading */
  Loading,
  /** 完成 */
  Finished,
  /** 取消 */
  Cancel,
}

export enum EFileType {
  PDF = 'pdf',
  PPT = 'ppt',
  PPT_VND_POWERPOINT = 'vnd.ms-powerpoint',
  PPT_VND_PRESENTATION = 'vnd.openxmlformats-officedocument.presentationml.presentation',
  PPT_MSPOWERPOINT = 'vnd.mspowerpoint',
  PPT_POWERPOINT = 'powerpoint',
  PPT_X_MSPOWERPOINT = 'x-mspowerpoint',
  PPTX = 'vnd.openxmlformats-officedocument.presentationml.presentation',
  IMAGE = 'image',
  PNG = 'png',
  GIF = 'gif',
}

/** 排序方式 */
export enum ESortMethod {
  /** 順冪 */
  Asc = 'asc',
  /** 降冪 */
  Desc = 'desc',
}

/** 尺寸 */
export enum ESize {
  /** Small */
  S = 's',
  /** Middle */
  M = 'm',
  /** Large */
  L = 'l'
}

/** 側邊位置 */
export enum ESide {
  Right = 'right',
  Left = 'left',
  Top = 'top',
  Bottom = 'bottom',
}
