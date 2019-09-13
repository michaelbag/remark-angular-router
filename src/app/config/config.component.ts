import { Component, OnInit } from '@angular/core';
import { ConfigService, Config } from './config.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  config: Config;

  constructor(private configService: ConfigService, private messageService: MessageService) { }

  ngOnInit() {
    this.configService.getConfig()
      .subscribe((config: Config) => {
        this.config = config;
        this.gotConfig();
        this.messageService.add('Configuration loaded.');
      });
  }

  gotConfig() {
    // TODO: unsubscribe from configService when got configuration in ngOnInit

  }

}