import { TbarService } from './core/services/tbar.service';
import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  status: boolean = true;

  constructor(
    private electronService: ElectronService,
    private TbarService: TbarService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);

    } else {
      console.log('Run in browser');
    }
  }


  clickEvent(evt){
    this.status = !this.status;
    console.log(this.status);

  }

minimize(){
  this.TbarService.minimizeWindow()
}
restore(){
  this.TbarService.restore();
}
close(){
  this.TbarService.closeWindow()
}
}
