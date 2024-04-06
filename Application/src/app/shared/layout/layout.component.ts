import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.addScrollEventListeners();
  }

  addScrollEventListeners(): void {
    const navLinks = document.querySelectorAll('.nav a');

    navLinks.forEach(link => {
      link.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const targetId = (link as HTMLAnchorElement).getAttribute('href')?.substring(1);
        const targetSection = document.getElementById(targetId!);

        targetSection?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }


}
