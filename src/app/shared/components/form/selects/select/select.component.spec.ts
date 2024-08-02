import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowService } from '@shared/services/window.service';
import { IOption } from '@shared/ultilities/interfaces/common.interface';
import { Subject } from 'rxjs';

import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let mockWindowService: jasmine.SpyObj<WindowService>;
  let clickSubject: Subject<Event>;

  beforeEach(async () => {
    clickSubject = new Subject<Event>();
    mockWindowService = jasmine.createSpyObj('WindowService', [], {
      click$: clickSubject.asObservable()
    });


    await TestBed.configureTestingModule({
      imports: [SelectComponent],
      providers: [
        { provide: WindowService, useValue: mockWindowService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toBe('選擇');
    expect(component.typeTitle).toBe('');
    expect(component.showDropdown).toBeFalse();
    expect(component.options).toEqual([]);
  });

  it('should toggle dropdown visibility on click', () => {
    const dropdownElement = fixture.debugElement.query(By.css('ul'));
    expect(dropdownElement).toBeNull();

    const toggleElement = fixture.debugElement.query(By.css('div'));
    toggleElement.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.showDropdown).toBeTrue();
    expect(fixture.debugElement.query(By.css('ul'))).toBeTruthy();
  });

  it('should hide dropdown when clicking outside', () => {
    component.showDropdown = true;
    fixture.detectChanges();

    const outsideClick = new MouseEvent('click', { bubbles: true, cancelable: true });
    Object.defineProperty(outsideClick, 'target', { value: document.body });
    clickSubject.next(outsideClick);
    fixture.detectChanges();

    expect(component.showDropdown).toBeFalse();
    expect(fixture.debugElement.query(By.css('ul'))).toBeNull();
  });

  it('should update typeTitle and emit option on selection', () => {
    const testOption = { name: 'Option 1' } as IOption;
    component.options = [testOption];
    component.showDropdown = true;
    fixture.detectChanges();

    spyOn(component.select, 'emit');

    const dropdownItem = fixture.debugElement.query(By.css('li'));
    expect(dropdownItem).not.toBeNull();
    dropdownItem.triggerEventHandler('click', null);

    expect(component.typeTitle).toBe(testOption.name);
    expect(component.select.emit).toHaveBeenCalledWith(testOption);
  });

  it('should set typeTitle on options change', () => {
    const options = [{ name: 'Option 1' }] as IOption[];
    component.options = options;
    fixture.detectChanges();

    const simpleChanges: SimpleChanges = {
      options: new SimpleChange([], options, true)
    };
    component.ngOnChanges(simpleChanges);

    expect(component.typeTitle).toBe(options[0].name);
  });
});
