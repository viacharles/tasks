import { NgIf, NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CustomForm } from '@shared/abstracts/customForm.abstract';
import { WindowService } from '@shared/services/window.service';
import { IOption } from '@shared/ultilities/interfaces/common.interface';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent extends CustomForm<string> implements OnInit {
  @ViewChild('tSelf') tSelf?: ElementRef<HTMLElement>;
  @Output() select = new EventEmitter<IOption>();
  @Input() id = 'select';
  @Input() title = '選擇';
  @Input() options: IOption[] = [];

  constructor(
    private readonly $window: WindowService,
  ) { super() }

  public typeTitle = '';
  public showDropdown = false;

  ngOnInit() {
    this.$window.click$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(click => {
        if (this.tSelf && !this.tSelf.nativeElement.contains(click.target as Node)) {
          this.showDropdown = false;
        };
      });
  }

  ngOnChanges({ options }: SimpleChanges): void {
    if (options && options.currentValue && options.currentValue.length) {
      this.typeTitle = options.currentValue[0].name;
    };
  }

  public onSelect(option: IOption) {
    this.typeTitle = option.name;
    this.select.emit(option);
  }

}
