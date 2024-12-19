import { Component, computed, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar"
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'space-travelers';
  isConnected = signal(false);
  userName=computed(()=>this.profile().firstName)
  profile:WritableSignal<KeycloakProfile>=signal({})
  constructor(private readonly keycloakService:KeycloakService){}
  ngOnInit(): void {
    this.isConnected.set(this.keycloakService.isLoggedIn())     
    if(this.keycloakService.isLoggedIn()){ 
      this.keycloakService.loadUserProfile().then(profile=>{
      this.profile.set(profile);
    })}
  }
  login(){
    this.keycloakService.login()
  };
  logout() {
  this.keycloakService.logout();
  }
}
