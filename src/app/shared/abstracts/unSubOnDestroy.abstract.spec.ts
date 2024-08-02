import { Injectable } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { UnSubOnDestroy } from "./unSubOnDestroy.abstract";

@Injectable()
class TestUnSubOnDestroy extends UnSubOnDestroy {
  public triggerBasePageOnDestroy() {
    this.basePageOnDestroy();
  }

  public triggerOnDestroy() {
    this.onDestroy();
  }
}

describe('UnSubOnDestroy', () => {
  let service: TestUnSubOnDestroy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestUnSubOnDestroy]
    });
    service = TestBed.inject(TestUnSubOnDestroy);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should complete the onDestroy$ observable on destroy', () => {
    let completed = false;
    service.onDestroy$.subscribe({
      complete: () => completed = true
    });
    service.ngOnDestroy();
    expect(completed).toBe(true);
  })

  it('should call basePageOnDestroy on destroy', () => {
    spyOn(service as any, 'basePageOnDestroy').and.callThrough();
    service.ngOnDestroy();
    expect((service as any).basePageOnDestroy).toHaveBeenCalled();
  })
})


