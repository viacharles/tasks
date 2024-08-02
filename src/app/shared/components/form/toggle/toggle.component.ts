import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CustomForm, getFormProvider } from '@shared/abstracts/customForm.abstract';

@Component({
  selector: 'app-toggle',
  standalone: true,
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [getFormProvider(ToggleComponent)]
})
export class ToggleComponent<T> extends CustomForm {
  @ViewChild('tCheck') tCheck?: ElementRef<HTMLInputElement>;
  @Input() override disabled = false;
  @Input() checked?: boolean;
  @Input() id?: string;
  @Input() value?: T;
  @Output() check = new EventEmitter<Event>();

  constructor() { super() }

  public toCheck(event: Event): void {
    this.notifyValueChange(
      // 如果外面沒有傳value就用checked值
      this.value
        ? (event.target as HTMLInputElement).checked
          ? this.value
          : null
        : (event.target as HTMLInputElement).checked
    );
    this.check.emit(event);
  }
}
