import { Component } from '@angular/core';
import { QuestionBase } from './models/question-base';
import { QuestionService } from './services/question.service';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from './sharedComponents/dynamic-form/dynamic-form.component';
import { AsyncPipe } from '@angular/common';
import { AdBannerComponent } from "./dynamicComponents/ad-banner/ad-banner.component";

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>
      <app-ad-banner></app-ad-banner>
    </div>
  `,
  providers: [QuestionService],
  imports: [AsyncPipe, DynamicFormComponent, AdBannerComponent],
})
export class AppComponent {
  questions$: Observable<QuestionBase<any>[]>;
  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
