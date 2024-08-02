import { Obj } from '@shared/helpers/object.helper';
import { Subject, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ICard, IFilter } from './shared/tasks.interface';
import { EColorType, EFormMode, ESize } from '@shared/ultilities/enums/common.enum';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchInputComponent } from '@shared/components/form/inputs/search-input/search-input.component';
import { IOption } from '@shared/ultilities/interfaces/common.interface';
import { EInputType, EState } from './shared/tasks.enum';
import { BorderButtonComponent } from '@shared/components/buttons/border-button/border-button.component';
import { IconButtonComponent } from '@shared/components/buttons/icon-button/icon-button.component';
import { ButtonComponent } from '@shared/components/buttons/button/button.component';
import { InputComponent } from '@shared/components/form/inputs/input/input.component';
import { DatePipe, NgIf } from '@angular/common';
import { ToggleComponent } from '@shared/components/form/toggle/toggle.component';
import { FitContentTextareaComponent } from '@shared/components/form/textareas/fit-content-textarea/fit-content-textarea.component';
import { DatePickerComponent } from '@shared/components/form/date-picker/date-picker.component';
import { SelectComponent } from '@shared/components/form/selects/select/select.component';
import { Cards } from './shared/models/cards.model';
import { downFadeInAndCompressOut } from '@shared/helpers/animations.helper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [FormsModule, SearchInputComponent, IconButtonComponent, ButtonComponent, BorderButtonComponent, InputComponent, DatePickerComponent, SelectComponent, FitContentTextareaComponent, ToggleComponent, DatePipe, NgIf],
  providers: [BrowserAnimationsModule],
  templateUrl: './task.page.component.html',
  styleUrl: './task.page.component.scss',
  animations: [downFadeInAndCompressOut()]
})
export class TaskPageComponent implements OnInit, OnDestroy {

  public searchOptions: IOption[] = Obj.getOptionFromEnum(EInputType);
  public stateOption: IOption[] = Obj.getOptionFromEnum(EState);
  public filterSubject = new Subject<IFilter>();
  public filter$ = this.filterSubject.asObservable();
  public filter: IFilter = {
    state: EState.All,
    inputType: EInputType.All,
    input: '',
    startTime: '', // yyyy/MM/dd
    endTime: '' // yyyy
  };
  public inputType = EInputType.All;
  public cards = new Cards();

  subscription = new Subscription();

  // enums
  public stateType = EState;
  public sizeType = ESize;
  public colorType = EColorType;
  public modeType = EFormMode;

  ngOnInit(): void {
    this.subscription.add(
      this.filter$.subscribe((filter: IFilter) => {
        this.filter = filter;
        this.cards.filter(filter);
      })
    );
  }

  public isEdit(card: ICard): boolean { return card.mode === this.modeType.EDIT };

  public inputSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filterSubject.next({ ...this.filter, input: value });
  }

  public cancelInput() {
    this.filterSubject.next({ ...this.filter, input: '' });
  }

  public selectInputType(type: string) {
    this.filterSubject.next({ ...this.filter, inputType: type as EInputType });
  };

  public selectDate(range: string) {
    const startTime = range.split('~')[0];
    const endTime = range.split('~')[1];
    this.filterSubject.next({ ...this.filter, startTime, endTime })
  }

  public dateCancel() {
    this.filterSubject.next({ ...this.filter, startTime: '', endTime: '' });
  }

  public selectState(state: IOption) {
    this.filterSubject.next({
      ...this.filter,
      state: state.code as EState
    })
  }

  public toggleState(event: Event, index: number) {
    const check = (event.target as HTMLInputElement).checked;
    this.cards.list[index].state = check ? EState.Completed : EState.UnCompleted;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
