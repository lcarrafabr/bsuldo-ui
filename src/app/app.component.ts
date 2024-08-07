import { ThemeService } from './services/theme.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bsuldo-ui';
  tema: string = 'saga-purple';

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) { }
  ngOnInit(): void {

    /** Aqui crio um metodo chamando o service que busca no banco o tema configurado */
    //this.changeTheme('saga-purple')
    this.verificaTema();

  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

  verificaTema() {
    const temaStorage = localStorage.getItem('theme');
    if (temaStorage && this.isThemeValid(temaStorage)) {
      this.changeTheme(temaStorage);
    } else {
      this.changeTheme(this.tema);
    }
  }

  changeTheme(theme: string) {
    this.themeService.setTheme(theme);
  }

  isThemeValid(theme: string): boolean {
    const validThemes = ['saga-purple', 'vela-blue']; // Adicione todos os temas permitidos aqui
    return validThemes.includes(theme);
  }

  getThemeClass() {
    return this.themeService.getCurrentThemeClass();
  }

}


