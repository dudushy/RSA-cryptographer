/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.scss']
})
export class DecryptComponent implements OnInit {
  title = 'DecryptComponent';

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

  decryptMessage() {
    console.log(`[${this.title}#decryptMessage] checkKeys`, this.checkKeys);

    if (!this.checkKeys) {
      alert('You must generate a key pair first!');
      return;
    }

    const msgInput = document.getElementById('msgInput') as HTMLInputElement;
    console.log(`[${this.title}#decryptMessage] msgInput`, msgInput);

    const msg = msgInput.value;
    console.log(`[${this.title}#decryptMessage] msg`, msg);

    // const d = parseInt(this.private_key[0]);
    const d = BigInt(this.private_key[0]);
    console.log(`[${this.title}#decryptMessage] d`, d);

    // const n = parseInt(this.private_key[1]);
    const n = BigInt(this.private_key[1]);
    console.log(`[${this.title}#decryptMessage] n`, n);

    const msgOutput = [];

    msg.split(' ').forEach((number) => {
      // const step1 = parseInt(number);
      const step1 = BigInt(number);
      console.log(`[${this.title}#decryptMessage] (${number}) step1`, step1);

      // const step2 = step1 ** d;
      const step2 = this.modularExponentiation(step1, d, n);
      console.log(`[${this.title}#decryptMessage] (${number}) step2`, step2);

      // const step3 = step2 % n;
      // console.log(`[${this.title}#decryptMessage] (${number}) step3`, step3);

      // const step4 = String.fromCharCode(step3);
      const step4 = String.fromCharCode(Number(step2));
      console.log(`[${this.title}#decryptMessage] (${number}) step4`, step4);

      // const char = String.fromCharCode((parseInt(number) ** d) % n);
      // const char = String.fromCharCode(Number(BigInt(parseInt(number)) ** BigInt(d) % BigInt(n)));
      const char = String.fromCharCode(Number(this.modularExponentiation(BigInt(number), d, n)));
      // const char = step4;
      console.log(`[${this.title}#decryptMessage] (${number}) char`, char);

      msgOutput.push(char);
    });

    console.log(`[${this.title}#decryptMessage] msgOutput`, msgOutput);

    const msgOutputTextarea = document.getElementById('msgOutput') as HTMLTextAreaElement;
    console.log(`[${this.title}#decryptMessage] msgOutputTextarea`, msgOutputTextarea);

    msgOutputTextarea.value = msgOutput.join('');
  }

  modularExponentiation(base: bigint, exponent: bigint, modulus: bigint): bigint {
    if (modulus === BigInt(1)) return BigInt(0);

    let result = BigInt(1);
    base = base % modulus;

    while (exponent > BigInt(0)) {
      if (exponent % BigInt(2) === BigInt(1)) {
        result = (result * base) % modulus;
      }

      exponent >>= BigInt(1);
      base = (base * base) % modulus;
    }

    return result;
  }
}
