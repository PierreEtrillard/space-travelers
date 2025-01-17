import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderUtilService {
  subtitle=signal("Prêt à décoler vers les étoiles ?");
  constructor() { }
}
