/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-create-keys',
  templateUrl: './create-keys.component.html',
  styleUrls: ['./create-keys.component.scss']
})
export class CreateKeysComponent implements OnInit {
  title = 'CreateKeysComponent';

  constructor(
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);
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

  createKeys() {
    const p = document.getElementById('pNumber') as HTMLInputElement;
    console.log(`[${this.title}#createKeys] p`, p);

    const pValue = parseInt(p.value);
    console.log(`[${this.title}#createKeys] pValue`, pValue);

    const q = document.getElementById('qNumber') as HTMLInputElement;
    console.log(`[${this.title}#createKeys] q`, q);

    const qValue = parseInt(q.value);
    console.log(`[${this.title}#createKeys] qValue`, qValue);

    const verifyPrimesResult = this.verifyPrimes(qValue, pValue);
    console.log(`[${this.title}#createKeys] verifyPrimesResult`, verifyPrimesResult);

    if (!verifyPrimesResult) {
      alert('P and Q must be prime numbers!');
      return;
    }

    const calculateNResult = this.calculateN(pValue, qValue);
    console.log(`[${this.title}#createKeys] calculateNResult`, calculateNResult);

    const calculateZResult = (pValue - 1) * (qValue - 1);
    console.log(`[${this.title}#createKeys] calculateZResult`, calculateZResult);

    const findDResult = this.findD(calculateZResult);
    console.log(`[${this.title}#createKeys] findDResult`, findDResult);

    const calculateEResult = this.calculateE(calculateZResult, findDResult);
    console.log(`[${this.title}#createKeys] calculateEResult`, calculateEResult);

    const privateKey = [findDResult, calculateNResult];
    console.log(`[${this.title}#createKeys] privateKey`, privateKey);

    this.app.db.set('private_key', privateKey);

    const publicKey = [calculateEResult, calculateNResult];
    console.log(`[${this.title}#createKeys] publicKey`, publicKey);

    this.app.db.set('public_key', publicKey);
  }

  verifyPrimes(q, p) {
    console.log(`[${this.title}#verifyPrimes] q`, q);
    console.log(`[${this.title}#verifyPrimes] p`, p);

    if (!q || !p) return false;

    let flag_p = true;
    let flag_q = true;

    if (p > 1 && q > 1) {
      for (let i = 2; i < p; i++) {
        if (p % i == 0) {
          flag_p = false;
          break;
        }
      }

      for (let i = 2; i < q; i++) {
        if (q % i == 0) {
          flag_q = false;
          break;
        }
      }
    }

    return flag_p && flag_q;
  }

  calculateN(p, q) {
    console.log(`[${this.title}#calculateN] p`, p);
    console.log(`[${this.title}#calculateN] q`, q);

    return p * q;
  }

  calculateZ(p, q) {
    console.log(`[${this.title}#calculateZ] p`, p);
    console.log(`[${this.title}#calculateZ] q`, q);

    return (p - 1) * (q - 1);
  }

  findD(z) {
    console.log(`[${this.title}#findD] z`, z);

    const gcd = (a, b) => {
      if (b == 0) {
        return a;
      } else {
        return gcd(b, a % b);
      }
    };

    let d = 2;
    const dArray = [];

    while (d < z) {
      if (gcd(d, z) == 1) dArray.push(d);
      d++;
    }

    console.log(`[${this.title}#findD] dArray`, dArray);

    const chooseD = Math.floor(Math.random() * dArray.length);
    console.log(`[${this.title}#findD] chooseD`, chooseD);

    const choosenD = dArray[chooseD];
    console.log(`[${this.title}#findD] choosenD`, choosenD);

    return choosenD;
  }

  calculateE(z, d) {
    console.log(`[${this.title}#calculateE] z`, z);
    console.log(`[${this.title}#calculateE] d`, d);

    let e = 1;
    while (e) {
      if ((e * d) % z == 1) break;
      e++;
    }

    console.log(`[${this.title}#calculateE] e`, e);

    return e;
  }
}
