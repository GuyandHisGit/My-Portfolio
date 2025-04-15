import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('emoji', { static: true }) emoji!: ElementRef;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    // 🔹 Intro description animation
    const introSplit = new SplitType('.intro-description', { types: 'chars' });
    gsap.set(introSplit.chars, { opacity: 0.1 });

    gsap.to(introSplit.chars, {
      opacity: 1,
      stagger: 0.03,
      ease: 'none',
      scrollTrigger: {
        trigger: '.intro-description',
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: true,
      }
    });

    // 🔹 Skills Intro Text Animation
    const skillsSplit = new SplitType('.skills-intro', { types: 'chars' });

    gsap.fromTo(
      '.skills-intro .char',
      { opacity: 0.2, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-intro',
          start: 'top 70%',
          end: 'bottom 60%',
          scrub: true
        }
      }
    );

    // 🔹 Confetti Animation (triggered every time emoji enters viewport)
    if (this.emoji?.nativeElement) {
      ScrollTrigger.create({
        trigger: this.emoji.nativeElement,
        start: 'top 58%',
        onEnter: () => this.launchConfetti(),
        toggleActions: 'play none none none'  // fire on every enter
      });
    }

    // ========== Skills List Animation ==========
    gsap.from('.skills-list li', {
      opacity: 1,
      y: 30,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-list',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });


  }

  private launchConfetti(): void {
    const emojiRect = this.emoji.nativeElement.getBoundingClientRect();
    const x = (emojiRect.left + emojiRect.width / 2) / window.innerWidth;
    const y = (emojiRect.top + emojiRect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 30,
      startVelocity: 30,
      origin: { x, y },
      zIndex: 1000
    });
  }



}
