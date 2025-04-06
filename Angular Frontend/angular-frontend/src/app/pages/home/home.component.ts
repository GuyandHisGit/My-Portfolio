import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core'; 
import * as THREE from 'three';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  textLines = ["The Product &", "Design Work of", "GUY"];

  @ViewChild('globeContainer', { static: false }) globeContainer!: ElementRef;
  @ViewChild('container', { static: true }) container!: ElementRef; // ✅ Added missing container

  constructor(private router: Router) {}

  ngOnInit() {
    this.typeText();
  }

  ngAfterViewInit() {
    this.setupGlobe();
  }

  typeText() {
    const elements = [
      document.getElementById("line1"),
      document.getElementById("line2"),
      document.getElementById("line3")
    ];
  
    /*// Check if animation has already run
    if (localStorage.getItem("textAnimationDone")) {
      // Directly set text without animation
      elements.forEach((element, index) => {
        if (element) element.innerHTML = this.textLines[index];
      });
      return;
    }*/
  
    let lineIndex = 0;
    const typeLine = () => {
      if (lineIndex >= this.textLines.length) return;
      let i = 0;
      const text = this.textLines[lineIndex];
      const element = elements[lineIndex];
      element!.classList.add("typing");
      const typing = setInterval(() => {
        if (i < text.length) {
          element!.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
          i++;
        } else {
          clearInterval(typing);
          element!.innerHTML = text;
          lineIndex++;
          setTimeout(typeLine, 500);
        }
      }, 100);
    };
  
    typeLine();
  
    // Set flag to avoid re-triggering animation
    localStorage.setItem("textAnimationDone", "true");
  }
  

  setupGlobe() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    this.globeContainer.nativeElement.appendChild(renderer.domElement);
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const texture = new THREE.TextureLoader().load('assets/images/earth.png', (tex) => {
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.repeat.set(1.4, 1.4);
      tex.offset.set(0, -0.15);
    });
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    const light = new THREE.PointLight(0xffffff, 80, 0);
    light.position.set(2, 2, 5);
    scene.add(light);
    camera.position.z = 3;
    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.02;
      renderer.render(scene, camera);
    }
    animate();
  }

  @HostListener("wheel", ["$event"])
  onScroll(event: WheelEvent) {
    if (!this.container) return;
    const container = this.container.nativeElement;
    
    if (event.deltaY > 0) {
      this.showExtensionPage();  // ✅ Scroll down goes to the extension page
    } else if (event.deltaY < 0) {
      this.showHomePage();  // ✅ Scroll up goes back to the home page
    }
  }

  showExtensionPage() {
    const nextSection = document.getElementById("extension");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  showHomePage() {
    const homeSection = document.querySelector(".home-page");
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  navigateToCodelabs() {
    this.router.navigate(['/codelabs']);
  }
}
