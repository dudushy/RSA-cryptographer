/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.scss']
})
export class EncryptComponent implements OnInit {
  title = 'EncryptComponent';

  private_key = '';
  public_key = '';

  checkKeys = false;

  constructor(
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);

    this.private_key = this.app.db.get('private_key');
    console.log(`[${this.title}#ngOnInit] private_key`, this.private_key);

    this.public_key = this.app.db.get('public_key');
    console.log(`[${this.title}#ngOnInit] public_key`, this.public_key);

    if (this.private_key || this.public_key) this.checkKeys = true;
  }

  updateView() {
    console.log(`[${this.title}#updateView]`);

    this.cdr.detectChanges;
    this.app.updateView(this.title);
  }

  async redirectTo(url: any) {
    await this.app.redirectTo(url, this.title);

    this.updateView();
  }

  defaultOrder() { return 0; }

  encryptMessage() {
    console.log(`[${this.title}#encryptMessage] checkKeys`, this.checkKeys);

    if (!this.checkKeys) {
      alert('You must generate a key pair first!');
      return;
    }

    const msgInput = document.getElementById('msgInput') as HTMLInputElement;
    console.log(`[${this.title}#encryptMessage] msgInput`, msgInput);

    const msg = msgInput.value;
    console.log(`[${this.title}#encryptMessage] msg`, msg);

    const e = parseInt(this.public_key[0]);
    console.log(`[${this.title}#encryptMessage] e`, e);

    const n = parseInt(this.public_key[1]);
    console.log(`[${this.title}#encryptMessage] n`, n);

    const msgOutput = [];

    for (let i = 0; i < msg.length; i++) {
      const char = msg.charCodeAt(i) ** e % n;
      console.log(`[${this.title}#encryptMessage] (${msg[i]}) char`, char);

      msgOutput.push(char);
    }

    console.log(`[${this.title}#encryptMessage] msgOutput`, msgOutput);

    const msgOutputTextarea = document.getElementById('msgOutput') as HTMLTextAreaElement;
    console.log(`[${this.title}#encryptMessage] msgOutputTextarea`, msgOutputTextarea);

    msgOutputTextarea.value = msgOutput.join(' ');
  }
}
