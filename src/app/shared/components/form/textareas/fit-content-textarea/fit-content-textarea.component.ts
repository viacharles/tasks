import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CustomForm, getFormProvider } from '@shared/abstracts/customForm.abstract';
import { take, timer } from 'rxjs';

@Component({
  selector: 'app-fit-content-textarea',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './fit-content-textarea.component.html',
  styleUrls: ['./fit-content-textarea.component.scss'],
  providers: [getFormProvider(FitContentTextareaComponent)],
})
export class FitContentTextareaComponent
  extends CustomForm<string>
  implements OnChanges, AfterViewInit {
  @ViewChild('tTextArea') tTextArea?: ElementRef<HTMLTextAreaElement>;
  @Input() placeholder = '請輸入內容...';
  @Input() errorMessage?: string
  @Input() minHeight = '';
  @Input() maxHeight = '';
  @Input() show?: boolean;
  @Input() clear?: boolean;
  @Input() override disabled = false;
  @Input() isError = false;

  constructor(
    private selfElem: ElementRef,
    private renderer: Renderer2
  ) {
    super();
  }

  public preReserveHeight?: number;

  ngOnChanges({ show, clear }: SimpleChanges): void {
    if (show) {
      this.show = true;
      this.setHeightByShow();
    }
    if (clear) {
      this.model = '';
      this.setHeightByShow();
    }
  }

  ngAfterViewInit(): void {
    if (this.show) {
      timer(1000).pipe(take(1)).subscribe(() => this.setHeightByShow());
    };
  }

  public resize(fieldElem: HTMLElement): void {
    this.renderer.setStyle(this.selfElem.nativeElement, 'height', 'auto');
    const scrollHeight = fieldElem.scrollHeight;
    this.renderer.setStyle(
      this.selfElem.nativeElement,
      'height',
      scrollHeight + 'px'
    );
    this.preReserveHeight = scrollHeight;
    const inputValue = (fieldElem as HTMLInputElement).value;
    this.notifyValueChange(inputValue);
  }

  private setHeightByShow() {
    if (this.show) {
      this.renderer.setStyle(this.selfElem.nativeElement, 'height', 'auto');
      this.renderer.setStyle(
        this.selfElem.nativeElement,
        'height',
        this.tTextArea?.nativeElement.scrollHeight + 'px'
      );
    } else {
      this.renderer.setStyle(this.selfElem.nativeElement, 'height', '0');
    };
  }
}
