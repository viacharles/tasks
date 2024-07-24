import { Injectable } from '@angular/core';
import { EAction, EFeedbackType } from '@shared/ultilities/enums/common.enum';
import { IArticle } from '@shared/ultilities/interfaces/common.interface';
import { IDialog, IDialogParams, IOverlayEvent, IToast, IToastEvent } from '@shared/ultilities/interfaces/overlay.interface';

import { BehaviorSubject, filter, scan, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor() { }

  /** dialog 序列 */
  private dialogQueueSubject = new BehaviorSubject<any>(null);
  public dialogQueue$ = this.dialogQueueSubject.asObservable().pipe(
    filter((dialogEvent: any) => !!dialogEvent),
    scan(
      (queue: IDialog[], current: IOverlayEvent) =>
        this.resolveDialogEvent(queue, current),
      []
    )
  );

  /** toast 序列 */
  private toastQueueSubject = new BehaviorSubject<any>(null);
  public toastQueue$ = this.toastQueueSubject.asObservable().pipe(
    filter((toastEvent: any) => !!toastEvent),
    scan(
      (queue: IToast[], current: IToastEvent) =>
        this.resolveToastEvent(queue, current),
      []
    )
  );

  /** 新增 dialog */
  public addDialog<T = any>(
    component: any,
    data?: T,
    params?: IDialogParams
  ): void {
    this.dialogQueueSubject.next({
      action: EAction.Add,
      overlay: {
        component,
        id: new Date().getTime().toString(),
        data,
        params: {
          ...{
            hasCloseBtn: false,
            hasBackDrop: true,
            isBackDropClose: false,
          },
          ...params,
        },
      },
    });
  }

  /** 關閉 dialog */
  public closeDialog(dialog: IDialog): void {
    this.dialogQueueSubject.next({
      action: EAction.Delete,
      overlay: dialog,
    });
  }

  /** 清空 dialogs */
  public clearAllDialog(): void {
    this.dialogQueueSubject.next({ action: EAction.Clear });
  }

  /** 新增 toast */
  public addToast(type: EFeedbackType, article: IArticle) {
    this.toastQueueSubject.next({
      action: EAction.Add,
      toast: {
        id: new Date().getTime().toString(),
        type,
        article,
      },
    });
  }

  /** 關閉 toast */
  public deleteToast(toast: IToast) {
    this.toastQueueSubject.next({ action: EAction.Delete, toast });
  }

  /** 清空 toasts */
  public clearToast() {
    this.toastQueueSubject.next({ action: EAction.Clear });
  }

  /** 處理 dialog 事件 */
  private resolveDialogEvent(
    queue: IDialog[],
    { overlay, action }: IOverlayEvent<any>
  ): IDialog[] {
    const Target = overlay as IDialog;
    switch (action) {
      case EAction.Add:
        if (!queue.some(item => item.id === Target.id)) {
          queue.push(Target);
        }
        break;
      case EAction.Delete:
        if (queue.some(item => item.id === Target.id)) {
          queue = queue.filter(single => Target.id !== single.id);
        }
        break;
      case EAction.Clear:
        queue = [];
        break;
    }
    return queue;
  }

  /** 處理 toast 事件 */
  private resolveToastEvent(
    queue: IToast[],
    { toast, action }: IToastEvent
  ): IToast[] {
    /** 畫面出現 toast 上限 */
    const ToastMax = 5;
    switch (action) {
      case EAction.Add:
        if (!queue.some(item => item.id === toast.id)) {
          queue.push(toast);
          if (queue.length > ToastMax) {
            timer(0).subscribe(() => this.deleteToast(queue[0]));
          }
        }
        break;
      case EAction.Delete:
        if (queue.some(item => item.id === toast.id)) {
          queue = queue.filter(single => toast.id !== single.id);
        }
        break;
      case EAction.Clear:
        queue = [];
        break;
    }
    return queue;
  }
}
