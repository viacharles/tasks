import { LayoutComponent } from './modules/layout/layout.component';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WindowService } from '@shared/services/window.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tasks';
  constructor(
    private readonly $window: WindowService,
  ) {
  }

  @HostListener('click', ['$event']) click(event: Event) {
    this.$window.clickSubject.next(event);
  };

}
