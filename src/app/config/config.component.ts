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

  redmineURL_: string;

  constructor(private configService: ConfigService, private messageService: MessageService) { }

  ngOnInit() {
    this.configService.getConfig()
      .subscribe((config: Config) => {
        this.config = config;
        this.redmineURL_ = config.redmineUrl;
        this.gotConfig();
        this.messageService.add('Configuration loaded.');
      });
  }

  putTestUrl() {

    // let configTest:Config = {redmineUrl: "https://remark.pro/" + (Math.random() * 6) , redmineApiKey: "fewfew", debug: true};
    // this.configService.configObservable.next(configTest);
    this.configService.reloadConfig();

  }

  gotConfig() {
    // TODO: unsubscribe from configService when got configuration in ngOnInit

  }

}