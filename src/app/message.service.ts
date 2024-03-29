import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  
  messages: string[] = [];
  
  public add(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
  }

}