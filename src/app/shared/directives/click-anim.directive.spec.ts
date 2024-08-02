import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickAnimDirective } from './click-anim.directive';

@Component({
  template: `<button appClickAnim>Click me!</button>`
})
class TestHostComponent { }

describe('ClickAnimDirective', () => {
  let directive: ClickAnimDirective;
  let mockElementRef: ElementRef;
  let mockRenderer: Renderer2;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    mockElementRef = new ElementRef(document.createElement('div'));
    mockRenderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
    directive = new ClickAnimDirective(mockElementRef, mockRenderer);
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [ClickAnimDirective]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add and remove the "clicked" class on click', fakeAsync(() => {
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    buttonElement.click();
    fixture.detectChanges();

    expect(buttonElement.classList).toContain('clicked');

    tick(300);
    fixture.detectChanges();

    expect(buttonElement.classList).not.toContain('clicked');
  }));
});
