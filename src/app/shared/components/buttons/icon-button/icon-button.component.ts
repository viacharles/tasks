
import { Component, Input } from '@angular/core';
import { ClickAnimDirective } from '@shared/directives/click-anim.directive';
import { ESize } from '@shared/ultilities/enums/common.enum';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [ClickAnimDirective],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  @Input() classes: string = '';
  @Input() size: ESize = ESize.M;
}
