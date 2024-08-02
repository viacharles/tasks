import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SearchInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the input value and reflect it in the model', () => {
    const newValue = 'Test Search';
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = newValue;
    input.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(input.value).toBe(newValue);
    expect(component.model).toBe(newValue);
  });

  it('按下enter後進行搜尋', () => {
    spyOn(component.search, 'emit');
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = 'Search Query';
    fixture.detectChanges();

    const event = new KeyboardEvent('keyup', {
      key: 'Enter',
      code: 'Enter',
      which: 13,
      bubbles: true
    });
    component.input(event, 'Search Query');
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith('Search Query');
  });

  it('點擊按鈕開啟dropdown，點選項目變更搜尋條件', () => {
    const searchOptions = [
      { name: 'Option 1', code: 0 },
      { name: 'Option 2', code: 1 }
    ];
    component.searchOptions = searchOptions;
    fixture.detectChanges();

    let dropdown = fixture.debugElement.query(By.css('.dropdown'));
    expect(dropdown).toBeFalsy();
    const inputDiv = fixture.debugElement.query(By.css('.input')).nativeElement as HTMLElement;
    const tType = inputDiv.querySelector('.p-relative') as HTMLElement;
    tType.click();
    fixture.detectChanges();

    dropdown = fixture.debugElement.query(By.css('.dropdown'));
    expect(dropdown).toBeTruthy();

    const optionElements = fixture.debugElement.queryAll(By.css('.dropdown li'));
    expect(optionElements.length).toBe(searchOptions.length);

    optionElements[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.typeTitle).toBe(searchOptions[1].name);
  });

  it('清除按鈕清除input欄位', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = 'Test Clear';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const clearButtonDebugElement = fixture.debugElement.query(By.css('.icon-cancel-thick'));
    const clearButton = clearButtonDebugElement.nativeElement;

    expect(clearButton).toBeTruthy();

    clearButton.click();
    fixture.detectChanges();
    setTimeout(() => {
      expect(input.value).toBe('');
    })

  });
});
