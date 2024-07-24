import { AfterContentInit, Component, Input } from '@angular/core';
import { OverlayService } from '@shared/service/overlay.service';
import { CONTENT_STATUS } from '@utilities/enum/common.enum';
import { Toast } from '@utilities/model/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements AfterContentInit {
  @Input() toast?: Toast;

  get type() {
    return this.toast?.type;
  }
  get article() {
    return this.toast?.article;
  }
  get contentType() {
    return CONTENT_STATUS;
  }
  constructor(public overlayService: OverlayService) { }

  public iconCode?: string;

  ngAfterContentInit(): void {
    this.iconCode =
      this.toast?.type === CONTENT_STATUS.Error
        ? 'times'
        : this.toast?.type === CONTENT_STATUS.Success
          ? 'check'
          : 'exclamation';
  }

  public close(toast?: Toast): void {
    this.overlayService.deleteToast(toast as Toast);
  }
}
