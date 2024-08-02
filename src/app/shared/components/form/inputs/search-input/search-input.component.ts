import { takeUntil } from 'rxjs';
import { WindowService } from '@shared/services/window.service';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CustomForm, getFormProvider } from '@shared/abstracts/customForm.abstract';
import { NgIf, NgFor } from '@angular/common';
import { IOption } from '@shared/ultilities/interfaces/common.interface';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    FormsModule,
    NgIf, NgFor
  ],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [getFormProvider(SearchInputComponent)],
})
export class SearchInputComponent extends CustomForm<string> implements OnInit, OnChanges {
  @ViewChild('tType') tType?: ElementRef<HTMLElement>;
  @Output() search = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();
  @Output() selectType = new EventEmitter<string>();
  @Input() placeholder = '請輸入';
  @Input() id = 'search-input';
  @Input() searchOptions: IOption[] = [];
  constructor(
    private readonly $window: WindowService,
  ) {
    super();
  }

  public override model = '';
  public override disabled = false;

  public typeTitle = '';
  public showDropdown = false;

  ngOnInit() {
    this.$window.click$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(click => {
        if (this.tType && !this.tType.nativeElement.contains(click.target as Node)) {
          this.showDropdown = false;
        };
      });
  }

  ngOnChanges({ searchOptions }: SimpleChanges): void {
    if (searchOptions && searchOptions.currentValue && searchOptions.currentValue.length) {
      this.typeTitle = searchOptions.currentValue[0].name;
    };
  }

  public input(event: KeyboardEvent, value: string) {
    this.notifyValueChange(value);
    if (event.code === 'Enter' && !event.isComposing) {
      this.search.emit(value);
    }
  }

  public clear() {
    this.cancel.emit();
    this.notifyValueChange('');
  }

  public onSelectType(option: IOption) {
    this.typeTitle = option.name;
    this.selectType.emit(option.name);
  }
}
