import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// if (environment.production) {
//   enableProdMode();
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const base = document.querySelector('base');
//   if (!!base) {
//     const currentHref = base.getAttribute('href');
//     const targetHref = environment.baseHref;
//     if (currentHref !== targetHref) {
//       base.setAttribute('href', targetHref);
//       location.replace(targetHref);
//     } else {
//       bootstrapApplication(AppComponent, appConfig)
//         .catch((err) => console.error(err));
//     };
//   } else {
//     bootstrapApplication(AppComponent, appConfig)
//       .catch((err) => console.error(err));
//   };
// })

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
