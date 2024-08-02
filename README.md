<img width="978" alt="image" src="https://github.com/user-attachments/assets/9d4683e5-bd01-4efa-adf7-5ecd98fbdb37">
## How to run the source code

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
## Live demo site
## Test coverage
使用 jasminne
<img width="1674" alt="image" src="https://github.com/user-attachments/assets/34923458-3305-45bd-853b-4a259090bb6c">
在資料夾 coverage 中，
Run `ng test --code-coverage` 運行測試。
Run `open tasks/index.html` 開啟測試分數細節網頁

## Codebase architecture

### Folder Structure:

├──src  # Compiled files (alternatively `dist`)。  
├&nbsp;&nbsp;&nbsp;&nbsp;├──app  
├&nbsp;&nbsp;&nbsp;&nbsp;├──modules  # 功能區塊都放這裡  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──layout # 基礎排版  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──task   
├&nbsp;&nbsp;&nbsp;&nbsp;├──shared  # 共用元素  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──abstract  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──components  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──directives  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──helpers  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──serrvices  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──utilities  
├&nbsp;&nbsp;&nbsp;&nbsp;├──assets  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──font # font icon 庫  
├&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├──styles # base scss setting  




## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Tasks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.
