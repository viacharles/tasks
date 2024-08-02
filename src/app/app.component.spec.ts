import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowService } from '@shared/services/window.service';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { LayoutComponent } from './modules/layout/layout.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockWindowService: jasmine.SpyObj<WindowService>;
  let clickSubject: Subject<Event>;

  beforeEach(async () => {
    clickSubject = new Subject<Event>();
    mockWindowService = jasmine.createSpyObj('WindowService', ['clickSubject'], {
      clickSubject: clickSubject
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: WindowService, useValue: mockWindowService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have title "tasks"', () => {
    expect(component.title).toBe('tasks');
  });

  it('should render the layout component', () => {
    const layoutElement = fixture.debugElement.query(By.directive(LayoutComponent));
    expect(layoutElement).toBeTruthy();
  });

  it('should emit click event through WindowService', () => {
    spyOn(clickSubject, 'next');
    const mockEvent = new MouseEvent('click');

    const hostElement = fixture.debugElement.nativeElement;
    hostElement.dispatchEvent(mockEvent);

    expect(clickSubject.next).toHaveBeenCalledWith(mockEvent);
  });
});
