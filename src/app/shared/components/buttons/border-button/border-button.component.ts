
import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClickAnimDirective } from '@shared/directives/click-anim.directive';
import { EColorType, ESize } from '@shared/ultilities/enums/common.enum';

@Component({
  selector: 'app-border-button',
  standalone: true,
  imports: [NgIf, ClickAnimDirective],
  templateUrl: './border-button.component.html',
  styleUrl: './border-button.component.scss'
})
export class BorderButtonComponent {
  @Input() icon = '';
  @Input() type: EColorType = EColorType.Default;
  @Input() size: ESize = ESize.M;
}
