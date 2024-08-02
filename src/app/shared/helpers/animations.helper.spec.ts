import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { downFadeInAndCompressOut, fadeEnterAndHideOut, fadeEnterAndHideOutSmaller, fadeOut, fadeSlideInAndHideSlideOut, scaleInShortenOut, slideEnter, slideEnterAndOutScreen, upFadeInAndCompressOut, verticalShortenOut } from './animations.helper';

@Component({
  template: `
    <div *ngIf="show" @slideIn>Slide In</div>
    <div *ngIf="show" @slideInOut>Slide In and Out</div>
    <div *ngIf="show" @fadeInOut>Fade In and Out</div>
    <div *ngIf="show" @fadeInOutSize>Fade In and Out Size</div>
    <div *ngIf="show" @fadeSlideInOut>Fade Slide In and Out</div>
    <div *ngIf="show" @fadeOut>Fade Out</div>
    <div *ngIf="show" @upInCompressOut>Up In and Compress Out</div>
    <div *ngIf="show" @downInCompressOut>Down In and Compress Out</div>
    <div *ngIf="show" @verticalShortenOut>Vertical Shorten Out</div>
    <div *ngIf="show" @scaleInShortenOut>Scale In and Shorten Out</div>
  `,
  animations: [
    slideEnter(),
    slideEnterAndOutScreen(),
    fadeEnterAndHideOut(),
    fadeEnterAndHideOutSmaller(),
    fadeSlideInAndHideSlideOut(),
    fadeOut(),
    upFadeInAndCompressOut(),
    downFadeInAndCompressOut(),
    verticalShortenOut(),
    scaleInShortenOut()
  ]
})
class TestComponent {
  show = false;
}

describe('Animations', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [BrowserAnimationsModule, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  function getAnimationState(element: HTMLElement): string {
    const styles = window.getComputedStyle(element);
    return styles.opacity === '1' ? 'enter' : 'leave';
  }

  // it('should trigger slideEnter animation', async () => {
  //   fixture.componentInstance.show = true;
  //   fixture.detectChanges();

  //   await fixture.whenStable();
  //   const element = fixture.debugElement.query(By.css('div')).nativeElement;
  //   expect(getAnimationState(element)).toBe('enter');
  // });

  it('should trigger slideEnter animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[0].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger slideEnterAndOutScreen animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[1].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger fadeEnterAndHideOut animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[2].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger fadeEnterAndHideOutSmaller animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[3].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger fadeSlideInAndHideSlideOut animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[4].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger fadeOut animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[5].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger upFadeInAndCompressOut animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[6].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger downFadeInAndCompressOut animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[7].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger verticalShortenOut animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[8].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });

  it('should trigger scaleInShortenOut animation', async () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    await fixture.whenStable();
    const element = fixture.debugElement.queryAll(By.css('div'))[9].nativeElement;
    expect(getAnimationState(element)).toBe('enter');
  });
});
