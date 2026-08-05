import { Component, HostListener, signal } from '@angular/core';

export type ThemeMode = 'day' | 'sunset' | 'night';

const THEME_STORAGE_KEY = 'dhamecourt-theme';

function initialTheme(): ThemeMode {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'day' || stored === 'sunset' || stored === 'night'
    ? stored
    : 'sunset';
}

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: { '[class]': '"theme-" + theme()' },
})
export class AppComponent {
  readonly year = new Date().getFullYear();

  readonly scrolled = signal(false);

  readonly theme = signal<ThemeMode>(initialTheme());

  readonly navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  readonly highlights = [
    {
      title: 'Back-end',
      body: 'Java and Spring Boot microservices on an AWS Kubernetes platform, plus HCL Domino development, with a focus on clean, SOLID code and API-first design.',
    },
    {
      title: 'Front-end',
      body: 'TypeScript with Angular and Vue, modernizing legacy front-end stacks into today’s frameworks.',
    },
    {
      title: 'AI-assisted engineering',
      body: 'Building with AI coding tools like Devin, Claude Code, ChatGPT Codex, and GitHub Copilot to move faster without cutting corners.',
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

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
