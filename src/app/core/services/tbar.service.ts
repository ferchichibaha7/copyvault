import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ElectronService } from './electron/electron.service';

@Injectable({
  providedIn: 'root'
})
export class TbarService {

  constructor(private electron: ElectronService) {}

  minimizeWindow() {
    this.electron.send('tbar',{event:'minimize'})
  }
  closeWindow() {
    this.electron.send('tbar',{event:'close'})
  }
  restore() {
    this.electron.send('tbar',{event:'restore'})
  }

}
