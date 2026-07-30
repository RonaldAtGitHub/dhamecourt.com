import { Component, HostListener, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly year = new Date().getFullYear();

  // Set to null to hide the framed hero visual entirely.
  readonly photoUrl: string | null = 'assets/hero-mountains.jpg';

  readonly scrolled = signal(false);

  readonly navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  readonly highlights = [
    {
      title: 'Back-end',
      body: 'Java and Spring Boot microservices on an AWS Kubernetes platform, with a focus on clean, SOLID code and API-first design.',
    },
    {
      title: 'Front-end',
      body: 'TypeScript with Angular and Vue. Led major front-end modernizations, migrating legacy stacks to today’s frameworks.',
    },
    {
      title: 'Team & craft',
      body: 'Mentoring developers, sharing knowledge through code reviews and pair programming, and automating the processes around our work.',
    },
  ];

  readonly socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ronald-d-hamecourt' },
    { label: 'GitHub', href: 'https://github.com/RonaldAtGithub' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
