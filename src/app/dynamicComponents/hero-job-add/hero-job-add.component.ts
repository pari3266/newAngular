import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <div class="job-ad">
      <h4>{{ headline }}</h4>
      {{ body }}
    </div>
  `,
})
export class HeroJobAddComponent {
  @Input() headline!: string;
  @Input() body!: string;
}