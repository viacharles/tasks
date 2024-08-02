import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickAnimDirective } from '@shared/directives/click-anim.directive';
import { ESize } from '@shared/ultilities/enums/common.enum';
import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonComponent, ClickAnimDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the correct classes', () => {
    component.classes = 'test-class';
    component.size = ESize.L;
    fixture.detectChanges();

    const emElement = fixture.debugElement.query(By.css('em')).nativeElement;
    expect(emElement.classList).toContain('test-class');
    expect(emElement.classList).toContain('l');
    expect(emElement.classList).toContain('pe-pointer');
  });
});
