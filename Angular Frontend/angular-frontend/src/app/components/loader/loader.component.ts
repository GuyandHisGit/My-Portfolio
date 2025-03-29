import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  maingreeting: string = ''; // Initial greeting
  isLoading: boolean = true; // Controls loader visibility

  greetings: string[] = [
    '¡Hola!', 'Bonjour!', 'Hallo!', 'Ciao!', 'Olá!', 'Hallo!',
    'Привет!', '你好!', 'こんにちは!', '안녕하세요!', 'नमस्ते!',
    'নমস্কার!', 'مرحبا!', 'Γειά σου!'
  ];

  usedPositions: { x: number; y: number }[] = []; // Track used positions

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.maingreeting = 'Hello!';
      setTimeout(() => {
        this.showOtherGreetings(0);
      }, 1000);
    }, 500);
  }

  showOtherGreetings(index: number): void {
    if (index < this.greetings.length) {
      this.maingreeting = '';
      setTimeout(() => {
        this.maingreeting = this.greetings[index];
        this.setRandomPosition();
        setTimeout(() => {
          this.showOtherGreetings(index + 1);
        }, 300);
      }, 50);
    } else {
      this.isLoading = false;
      this.router.navigate(['/home']);
    }
  }

  setRandomPosition(): void {
    let x, y;
    let safeMargin = 10; // Ensure text stays within bounds
    do {
      x = Math.random() * 80 + safeMargin;
      y = Math.random() * 80 + safeMargin;
    } while (this.isOverlapping(x, y));
    this.usedPositions.push({ x, y });
    document.documentElement.style.setProperty('--greeting-x', `${x}vw`);
    document.documentElement.style.setProperty('--greeting-y', `${y}vh`);
  }

  isOverlapping(x: number, y: number): boolean {
    return this.usedPositions.some(pos =>
      Math.abs(pos.x - x) < 10 && Math.abs(pos.y - y) < 10
    );
  }
}