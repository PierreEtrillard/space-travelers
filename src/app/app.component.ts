import {
  Component,
  computed,
  effect,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderUtilService } from './services/header-util.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'space-travelers';
  subTitle!:WritableSignal<string> ;
  isConnected = signal(false);
  profile: WritableSignal<KeycloakProfile> = signal({});
  userName = computed(() => this.profile().firstName);
  @ViewChild('sidenav') sidenav!: MatSidenav

  constructor(
    private readonly keycloakService: KeycloakService,
    private headerService: HeaderUtilService,
    private router:Router
  ) {
    this.subTitle=this.headerService.subtitle;
  }
  ngOnInit(): void {
    this.isConnected.set(this.keycloakService.isLoggedIn());
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then((profile) => {
        this.profile.set(profile);
      });
    }
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd && this.sidenav){
        this.sidenav.close();
      }
    })
  }
  login() {
    this.keycloakService.login();
  }
  logout() {
    this.keycloakService.logout();
  }
}
