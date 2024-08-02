import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ClickAnimDirective } from '@shared/directives/click-anim.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIf, ClickAnimDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() bgColor = '';
  @Input() height = '2.25rem'
  @Input() disabled = false;
  @Input() icon = '';
  @Input() classes = '';
}
