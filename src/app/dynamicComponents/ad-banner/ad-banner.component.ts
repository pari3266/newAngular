import { AsyncPipe, NgComponentOutlet } from "@angular/common";
import { Component, ElementRef, inject, OnInit, Renderer2, ChangeDetectorRef, PLATFORM_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { AdService } from "../../services/ad.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe],
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <div class="banner-container" #bannerContainer>
        <ng-container *ngComponentOutlet="
          currentAd.component;
          inputs: currentAd.inputs;
        " />
      </div>
      <button (click)="displayNextAd()">Next</button>
    </div>
  `,
  styles: [`
    .banner-container {
      white-space: nowrap;
      overflow: hidden;
      position: relative;
    }
  `]
})
export class AdBannerComponent implements OnInit {
  private isBrowser: boolean;
  private adList = inject(AdService).getAds();
  private currentAdIndex = 0;
  subscription!: Subscription;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Determine if the code is running in the browser
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.displayNextAd(); 
      this.scheduleNextAd();
    }
  }

  get currentAd() {
    return this.adList[this.currentAdIndex];
  }

  displayNextAd() {
    if (this.isBrowser) {
      this.resetScrollPosition(); // Reset scroll before displaying the next ad

      this.currentAdIndex++;
      if (this.currentAdIndex === this.adList.length) {
        this.currentAdIndex = 0;
      } 

      this.cdr.detectChanges(); // Manually trigger change detection
      this.scrollBanner(); // Scroll banner after displaying the next ad
    }
  }

  scheduleNextAd() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.displayNextAd();
        this.scheduleNextAd();
      }, 3000);
    }
  }

  resetScrollPosition() {
    if (this.isBrowser) {
      const bannerContainer = this.el.nativeElement.querySelector('.banner-container');
      if (bannerContainer) {
        this.renderer.setStyle(bannerContainer, 'transition', 'none');
        this.renderer.setStyle(bannerContainer, 'transform', 'translateX(100%)');
      }
    }
  }

  scrollBanner() {
    if (this.isBrowser) {
      const bannerContainer = this.el.nativeElement.querySelector('.banner-container');
      if (bannerContainer) {
        // Delay setting the transition to ensure the reset is applied
        setTimeout(() => {
          this.renderer.setStyle(bannerContainer, 'transition', 'transform 3s linear');
          this.renderer.setStyle(bannerContainer, 'transform', 'translateX(-100%)');
        });
      }
    }
  }
}
