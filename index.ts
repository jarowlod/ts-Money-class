export class Money {
  constructor(private value: number = 0) {
    this.value = Money.round(isNaN(value) ? 0 : value);
  }
  
  static of(value: number | string): Money {
    return new Money(typeof value === 'number' ? value.valueOf() : parseFloat(value));
  }
  
  static round(value: number): number {
    return Math.round(value * 100 * (1 + Number.EPSILON)) / 100;
  }

  round(): Money {
    return new Money(Money.round(this.value));
  }

  static floor(value: number): number {
    return Math.floor(value * 100 * (1 + Number.EPSILON)) / 100;
  }

  static ceil(value: number): number {
    return Math.ceil(value * 100 * (1 + Number.EPSILON)) / 100;
  }

  eq(value: Money = new Money()): boolean {
    return this.value === value.value;
  }

  isZero() {
    return this.value === 0;
  }

  add(amount: Money): Money {
    return new Money(this.value + amount.value);
  }

  percent(percent: number = 0): Money {
    return new Money(this.value * percent / 100);
  }

  valueOf(): number {
    return this.value;
  }

  toCurrency(): string {
    return this.value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
  }
}

console.log( 
  new Money(5.015).add(new Money(0.015)).valueOf(),
  Money.of(5.015).add(Money.of(0.015)).valueOf(),
  Money.of(5.015*100).toCurrency(),
  Money.of(3).percent(50).valueOf(),
  Money.floor(5.011),
  Money.of('12kk')
);


var num = ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć", "dziesięć", "jedenaście", "dwanaście", "trzynaście", "czternaście", "piętnaście", "szesnaście", "siedemnaście", "osiemnaście", "dziewiętnaście"];
var tens = ["dwadzieścia", "trzydzieści", "czterdzieści", "pięćdziesiąt", "sześćdziesiąt", "siedemdziesiąt", "osiemdziesiąt", "dziewięćdziesiąt"];
var hundreds = ["", "sto", "dwieście", "trzysta", "czterysta", "pięćset", "sześćset", "siedemset", "osiemset", "dziewięćset"];

var groups = [["", "", ""],
            ["tysiąc", "tysiące", "tysięcy"],
            ["milion", "miliony", "milionów"],
            ["miliard", "miliardy", "miliardów"],
            ["bilion", "biliony", "bilionów"],
            ["biliard", "biliardy", "biliardów"],
            ["trylion", "tryliony", "trylionów"]];

function number2words(n){
    if (n < 20) return num[n];
    var digit = n%10;
    if (n < 100) return tens[~~(n/10)-2] + (digit? " " + num[digit]: "");
    if (n < 1000) return hundreds[~~(n/100)] + (n%100 == 0? "": " " + number2words(n%100));

    let d = 1000;
    if (n<1000000) d = 1;

    const baza = ~~(n/1000);
    const gr = baza%10;
    console.log(gr, baza)
    let grr = 0;
    switch (gr) {
      case 1: grr = baza<10 ? 0 : 2; break;
      case 2:
      case 3:
      case 4: grr = 1; break;
      default: grr = 2;
    };
    return number2words(~~(n/1000)) + " " + groups[d][grr] + (n%1000 != 0? " " + number2words(n%1000): "");
}

console.log(number2words(1116321))