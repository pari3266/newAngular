import { AsyncPipe, NgComponentOutlet } from "@angular/common";
import { Component, ElementRef, inject, OnInit, Renderer2 } from "@angular/core";
import { AdService } from "../../services/ad.service";
import { Subscription, switchMap, timer } from "rxjs";

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
export class AdBannerComponent implements OnInit{
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  private adList = inject(AdService).getAds();

  private currentAdIndex = 0;
  subscription !: Subscription;
  ngOnInit(): void {
    this.displayNextAd(); // Call immediately to display the first ad
    
    // Angular Call Function Every X Seconds Example
    // https://www.itsolutionstuff.com/post/angular-call-function-every-x-seconds-exampleexample.html

    // this.subscription = timer(0, 5000).pipe(
    //   switchMap(async () => this.API.displayNextAd())
    // ).subscribe(result => 
    //   console.log(result)
    // );
  }
  
  get currentAd() {
    return this.adList[this.currentAdIndex];
  }

  displayNextAd() {
    this.currentAdIndex++;
    // Reset the current ad index back to `0` when we reach the end of an array.
    if (this.currentAdIndex === this.adList.length) {
      this.currentAdIndex = 0;
    }
    // setTimeout(() => {
    //   // this.scrollBanner();
    //   this.ngOnInit();
    // }, 1000);
  }

  scrollBanner() {
    const bannerContainer = this.el.nativeElement.querySelector('.banner-container');
    if (bannerContainer) {
      this.renderer.setStyle(bannerContainer, 'transition', 'transform 3s linear');
      this.renderer.setStyle(bannerContainer, 'transform', 'translateX(-100%)');

      // Reset after animation
      setTimeout(() => {
        this.renderer.setStyle(bannerContainer, 'transform', 'translateX(100%)');
      }, 3000);
    }
  }

}

// import { AsyncPipe, NgComponentOutlet } from "@angular/common";
// import { Component, ElementRef, inject, OnInit, Renderer2, ChangeDetectorRef } from "@angular/core";
// import { AdService } from "../../services/ad.service";
// import { Subscription } from "rxjs";

// @Component({
//   selector: 'app-ad-banner',
//   standalone: true,
//   imports: [NgComponentOutlet, AsyncPipe],
//   template: `
//     <div class="ad-banner-example">
//       <h3>Advertisements</h3>
//       <div class="banner-container" #bannerContainer>

//       <ng-container *ngComponentOutlet="
//         currentAd.component;
//         inputs: currentAd.inputs;
//       " />
//       </div>
//       <button (click)="displayNextAd()">Next</button>
//     </div>
//   `,
//   styles: [`
//     .banner-container {
//       white-space: nowrap;
//       overflow: hidden;
//       position: relative;
//     }
//   `]
// })
// export class AdBannerComponent implements OnInit{
//   constructor(private renderer: Renderer2, private el: ElementRef, private cdr: ChangeDetectorRef) { }
//   private adList = inject(AdService).getAds();

//   private currentAdIndex = 0;
//   subscription !: Subscription;
//   ngOnInit(): void {
//     this.displayNextAd(); 
//     this.scheduleNextAd();
//   }
  
//   get currentAd() {
//     return this.adList[this.currentAdIndex];
//   }

//   displayNextAd() {
//     this.currentAdIndex++;
//     if (this.currentAdIndex === this.adList.length) {
//       this.currentAdIndex = 0;
//     }
//     this.cdr.detectChanges(); // Manually trigger change detection
//   }

//   scheduleNextAd() {
//     setTimeout(() => {
//       this.displayNextAd();
//       this.scheduleNextAd();
//     }, 3000);
//   }

//   scrollBanner() {
//     const bannerContainer = this.el.nativeElement.querySelector('.banner-container');
//     if (bannerContainer) {
//       this.renderer.setStyle(bannerContainer, 'transition', 'transform 3s linear');
//       this.renderer.setStyle(bannerContainer, 'transform', 'translateX(-100%)');
//       setTimeout(() => {
//         this.renderer.setStyle(bannerContainer, 'transform', 'translateX(100%)');
//       }, 3000);
//     }
//   }

// }
