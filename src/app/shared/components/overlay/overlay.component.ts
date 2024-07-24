import { Component, Injector, OnInit } from '@angular/core';
import { UnSubOnDestroy } from '@shared/abstracts/unSubOnDestroy.abstract';
import { fadeEnterAndHideOut, fadeOut, fadeSlideInAndHideSlideOut, scaleInShortenOut } from '@shared/helpers/animations.helper';
import { Dialog } from '@shared/models/dialog.model';
import { OverlayService } from '@shared/services/overlay.service';
import { IDialog } from '@shared/ultilities/interfaces/overlay.interface';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [fadeEnterAndHideOut(), fadeSlideInAndHideSlideOut(), fadeOut(), scaleInShortenOut()],
})
export class OverlayComponent extends UnSubOnDestroy implements OnInit {
  constructor(
    public $overlay: OverlayService,
    private injector: Injector
  ) {
    super();
  }

  public currentDialogs: IDialog[] = [];

  ngOnInit(): void {
    this.$overlay.dialogQueue$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(dialogs => this.afterDialogsChanged(dialogs));
  }

  /** dialog 序列來源發生改變後 */
  private afterDialogsChanged(srcDialogs: IDialog[]): void {
    srcDialogs.forEach(srcDialog => {
      if (!this.currentDialogs.some(({ id }) => srcDialog.id === id)) {
        this.currentDialogs.push(new Dialog(srcDialog, this.injector));
      };
    });
    this.currentDialogs = this.currentDialogs.filter(dialog =>
      srcDialogs.some(srcDialog => srcDialog.id === dialog.id)
    );
  }
}
