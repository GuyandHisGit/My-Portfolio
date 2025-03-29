import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textLines = ["The Product &", "Design Work of", "GUY"];

  constructor() {}

  ngOnInit() {
    this.typeText();
  }

  typeText() {
    const elements = [
      document.getElementById("line1"),
      document.getElementById("line2"),
      document.getElementById("line3")
    ];

    let lineIndex = 0;

    const typeLine = () => {
      if (lineIndex >= this.textLines.length) return;

      let i = 0;
      const text = this.textLines[lineIndex];
      const element = elements[lineIndex];

      element!.classList.add("typing"); // Add cursor

      const typing = setInterval(() => {
        if (i < text.length) {
          element!.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
          i++;
        } else {
          clearInterval(typing);
          element!.innerHTML = text; // Remove cursor after typing
          lineIndex++;
          setTimeout(typeLine, 500);
        }
      }, 100);
    };

    typeLine();
  }

  @ViewChild('globeContainer', { static: false }) globeContainer!: ElementRef;

  ngAfterViewInit() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(300, 300);
    this.globeContainer.nativeElement.appendChild(renderer.domElement);

    // Create a Sphere for the Globe
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const texture = new THREE.TextureLoader().load('assets/images/earth-texture.jpg'); // Make sure to add an earth texture image in this path
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    camera.position.z = 3;

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005; // Adjust rotation speed here
      renderer.render(scene, camera);
    }
    animate();
  }

}
