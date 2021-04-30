import { ElectronService } from './core/services/electron/electron.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  constructor(private ser: ElectronService)
{

}

senddata(d,r){
  this.ser.send(d,r)
}
getCurrentWindow() {
  return this.ser.getCurrentWindow();
}

closeWindow() {
  this.ser.closeWindow()

}
}

