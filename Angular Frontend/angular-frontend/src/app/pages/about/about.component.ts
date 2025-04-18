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
  debugSectors: number[] = Array.from({ length: 22 }, (_, i) => i * 16.36);

  @ViewChild('emoji', { static: true }) emoji!: ElementRef;

  // Skills array in class
  skills: string[] = [
    'HTML', 'CSS', 'JavaScript', 'Angular', 'TypeScript', 'GSAP', 'Spring Boot',
    'Java', 'MySQL', 'MongoDB', 'Node.js', 'Express', 'Git', 'Docker', 'AWS',
    'Firebase', 'Figma', 'Photoshop', 'Jira', 'Postman', 'Tailwind'
  ];

  // Method to calculate transform 
  getTransform(index: number): string {
    const total = this.skills.length;
    const angle = (360 / total) * index;
    const radius = 400; // Can adjust based on your layout
    return `rotate(${angle}deg) translateX(-${radius}px) rotate(-${angle}deg)`;
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    // Intro description animation
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
        scrub: true
      }
    });

    // Skills Intro Text Animation
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

    // Animate all section titles like skills-intro
setTimeout(() => {
  const sectionTitles = document.querySelectorAll('.section-title');

  sectionTitles.forEach((titleEl) => {
    const split = new SplitType(titleEl as HTMLElement, { types: 'chars' });
    gsap.set((split as any).chars, { opacity: 0.2, y: 30 });

    gsap.to((split as any).chars, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: titleEl,
        start: 'top 75%',
        end: 'bottom 60%',
        scrub: true
      }
    });
  });
}, 0); // slight delay ensures the view is initialized and rendered


    // Confetti Animation (triggered every time emoji enters viewport)
    if (this.emoji?.nativeElement) {
      ScrollTrigger.create({
        trigger: this.emoji.nativeElement,
        start: 'top 58%',
        onEnter: () => this.launchConfetti(),
        toggleActions: 'play none none none'
      });
    }

    // Pin the skills-section and rotate the circle-container as user scrolls

    const totalSkills = this.skills.length;
    const anglePerItem = 360 / totalSkills;
    const visibleItems = 5;
    const totalRotation = anglePerItem * (totalSkills - visibleItems); // customization needed

    gsap.to('.circle-container', {
      rotation: totalRotation,
      ease: 'none',
      scrollTrigger: {
        trigger: '.skills-section',
        start: 'top top',
        end: '+=3000', // scroll distance to control animation smoothness
        scrub: true,
        pin: true,
        anticipatePin: 1,
        markers: true // for debugging, remove in final version
      }
    });
    
    [
      { selector: '.experience-section', id: 'Experience' },
      { selector: '.approach-section', id: 'Approach' },
      { selector: '.personal-section', id: 'Personal' }
    ].forEach(({ selector, id }) => {
      ScrollTrigger.create({
        trigger: selector,
        start: 'top bottom',
        end: 'bottom top',
      });
    });    

    // Animate all h3s in experience section
    gsap.utils.toArray('.h3-wrapper h3').forEach((h3El: any) => {
      gsap.fromTo(h3El,
        { x: '-100%' },
        {
          x: '0%',
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: h3El,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: true,
          }
        }
      );
    });

    setTimeout(() => {
      // Target all <p> and <em> in the three sections
      const textElements = document.querySelectorAll(
        '.experience-section p, .experience-section em, .approach-section p, .approach-section em, .personal-section p, .personal-section em'
      );
    
      textElements.forEach((el) => {
        const split = new SplitType(el as HTMLElement, { types: 'chars' });
        gsap.set((split as any).chars, { opacity: 0.1 });
    
        gsap.to((split as any).chars, {
          opacity: 1,
          stagger: 0.03,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'bottom 60%',
            scrub: true,
          }
        });
      });
    }, 0);    
    
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
