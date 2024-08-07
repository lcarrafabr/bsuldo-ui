import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeLink: HTMLLinkElement;

  private currentThemeSubject = new BehaviorSubject<string>('saga-purple');
  currentTheme$ = this.currentThemeSubject.asObservable();

  private validThemes = ['saga-purple', 'vela-blue']; // Lista de temas permitidos

  constructor() {
    this.themeLink = document.createElement('link');
    this.themeLink.rel = 'stylesheet';
    this.themeLink.href = 'assets/themes/saga-purple/theme.css'; // Default theme
    this.themeLink.id = 'theme-link';
    document.head.appendChild(this.themeLink);

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && this.isThemeValid(storedTheme)) {
      this.setTheme(storedTheme);
    }
  }

  setTheme(theme: string) {
    if (this.isThemeValid(theme)) {
      this.themeLink.href = `assets/themes/${theme}/theme.css`;
      this.applyTheme(theme);
      localStorage.setItem('theme', theme);
      this.currentThemeSubject.next(theme);
    }
  }

  private applyTheme(theme: string) {
    switch (theme) {
      case 'saga-purple':
        this.updateThemeVariables({
          '--background-color': '#f0edff',
          '--text-color': '#ffffff',
          '--nav-bar-color': '#7a078c'
        });
        break;
      case 'vela-blue':
        this.updateThemeVariables({
          '--background-color': '#1c293b',
          '--text-color': '#ffffff',
          '--nav-bar-color': '#172230'
        });
        break;
      default:
        break;
    }
  }

  private updateThemeVariables(themeVariables: { [key: string]: string }) {
    const root = document.documentElement;
    Object.keys(themeVariables).forEach(property => {
      root.style.setProperty(property, themeVariables[property]);
    });
  }

  getCurrentThemeClass() {
    return `theme-${this.currentThemeSubject.value}`;
  }

  private isThemeValid(theme: string): boolean {
    return this.validThemes.includes(theme);
  }
}
