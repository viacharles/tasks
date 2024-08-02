import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CustomForm, getFormProvider } from '@shared/abstracts/customForm.abstract';
import { ESize } from '@shared/ultilities/enums/common.enum';

@Component({
  selector: 'app-input',
  imports: [FormsModule, NgIf],
  standalone: true,
  providers: [getFormProvider(InputComponent)],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent extends CustomForm<string> {
  @Input() type = 'text';
  @Input() id = 'input';
  @Input() placeholder = '請輸入...';
  @Input() errorMessage?: string
  @Input() override disabled = false;
  @Input() isError = false;
  @Input() size: ESize = ESize.M;

  public input(event: Event): void {
    this.trim(event);
    const value = (event.target as HTMLInputElement).value;
    this.notifyValueChange(value);
  }

  private trim(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.trim();
  }
}
