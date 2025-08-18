import { Component, computed, effect, linkedSignal, OnInit, Signal, signal, untracked, WritableSignal } from '@angular/core';
import { QuestionBase } from './models/question-base';
import { QuestionService } from './services/question.service';
import { Observable } from 'rxjs';
import { DynamicFormComponent } from './sharedComponents/dynamic-form/dynamic-form.component';
import { AsyncPipe } from '@angular/common';
import { AdBannerComponent } from "./dynamicComponents/ad-banner/ad-banner.component";
interface ShippingMethod {
  id: number;
  name: string;
}
@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>
      <!-- <app-ad-banner></app-ad-banner> -->
 <h2>Signals Demo</h2>

    <p>count = {{ count() }}</p>
    <p>doubleCount (computed, read-only) = {{ doubleCount() }}</p>
    <p>linkedDouble (linkedSignal, two-way) = {{ linkedDouble() }}</p>

    <button (click)="increment()">+1 count</button>
    <button (click)="setLinked()">Set linkedDouble = 50</button>
    </div>
  `,
  providers: [QuestionService],
  imports: [AsyncPipe, DynamicFormComponent, AdBannerComponent],
})
export class AppComponent implements OnInit {
  questions$: Observable<QuestionBase<any>[]>;
  // سیگنال اصلی
  count = signal(2);

  // فقط خواندنی
  doubleCount = computed(() => this.count() * 2);

  // دوطرفه
  linkedDouble = linkedSignal({
    source: this.count,
    computation: (value) => value * 2,          // وقتی count تغییر کنه → linkedDouble آپدیت میشه
  });

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();

    effect((onCleanup) => {
      console.log(`User set to ${this.count()} and the counter is ${untracked(this.doubleCount)}`);

      const timer = setTimeout(() => {
        console.log(`1 second ago`)
      }, 1000)

      onCleanup(() => {
        clearTimeout(timer);
      })
    });

    this.changeShipping(2);
    this.changeShippingOptions();
    console.log(this.selectedOption());
  }

  shippingOptions = signal<ShippingMethod[]>([
    { id: 0, name: 'Ground' },
    { id: 1, name: 'Air' },
    { id: 2, name: 'Sea' },
  ])

  selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
    source: this.shippingOptions,
    computation: (newOptions, previous) => {
      return (
        newOptions.find((opt) => opt.id === previous?.value.id) ?? newOptions[0]
      )
    }
  })
  ngOnInit(): void {
    this.count.set(2);
    console.log(this.count(), this.doubleCount());
  }
  increment() {
    this.count.update(v => v + 1);
  }

  setLinked() {
    this.linkedDouble.set(50); // اینجا count هم آپدیت میشه
  }

  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }
  changeShippingOptions() {
    this.shippingOptions.set([
      { id: 0, name: 'Email' },
      { id: 1, name: 'Sea' },
      { id: 2, name: 'Postal Service' },
    ]);
  }
}
