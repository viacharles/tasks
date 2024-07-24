import { Component, OnInit } from '@angular/core';
import { BaseDialog } from '@utilities/base/base-dialog';
import { CONTENT_STATUS } from '@utilities/enum/common.enum';
import { IWarnDialogParams } from '@utilities/interface/overlay.interface';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { IIcon } from '@utilities/interface/common.interface';

@Component({
  selector: 'app-warn-dialog',
  templateUrl: './warn-dialog.component.html',
  styleUrls: ['./warn-dialog.component.scss'],
})
export class WarnDialogComponent
  extends BaseDialog<IWarnDialogParams>
  implements OnInit {
  constructor(dialog: DialogContainerComponent) {
    super(dialog);
  }

  get contentType() {
    return CONTENT_STATUS;
  }
  get icon(): IIcon {
    switch (this.dialog.data.type) {
      case CONTENT_STATUS.Info:
        return { iconCode: 'exclamation text-warn', color: '#EFAD49' };
      default:
        return { iconCode: '', color: '' };
    }
  }

  protected override onInit(): void {
    if (!this.dialog.data.buttons) {
      this.dialog.data.buttons = {
        confirm: {
          bgColor: 'green-middle',
          text: 'common.confirm',
        },
        cancel: {
          text: 'common.cancel',
        },
      };
    }
  }
}
