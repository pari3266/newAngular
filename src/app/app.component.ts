import { Component } from '@angular/core';
import { QuestionBase } from './models/question-base';
import { QuestionService } from './services/question.service';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from './sharedComponents/dynamic-form/dynamic-form.component';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>
    </div>
  `,
  providers: [QuestionService],
  imports: [AsyncPipe, DynamicFormComponent],
})
export class AppComponent {
  questions$: Observable<QuestionBase<any>[]>;
  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
