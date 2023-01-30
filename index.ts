export class Money {
  constructor(private value: number = 0) {
    this.value = Money.round(isNaN(value) ? 0 : value);
  }

  static of(value: number | string): Money {
    return new Money(
      typeof value === 'number' ? value.valueOf() : parseFloat(value)
    );
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
    return new Money((this.value * percent) / 100);
  }

  valueOf(): number {
    return this.value;
  }

  toCurrency(): string {
    return this.value.toLocaleString('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    });
  }
}

console.log(
  new Money(5.015).add(new Money(0.015)).valueOf(),
  Money.of(5.015).add(Money.of(0.015)).valueOf(),
  Money.of(5.015 * 100).toCurrency(),
  Money.of(3).percent(50).valueOf(),
  Money.floor(5.011),
  Money.of('12kk')
);



const num = ['zero', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć', 'dziesięć',
  'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście'];
const tens = ['dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt'];
const hundreds = ['', 'sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset', 'sześćset', 'siedemset', 'osiemset', 'dziewięćset'];

const groups = [
  ['', '', ''],
  ['tysiąc', 'tysiące', 'tysięcy'],
  ['milion', 'miliony', 'milionów'],
  ['miliard', 'miliardy', 'miliardów'],
  ['bilion', 'biliony', 'bilionów'],
  ['biliard', 'biliardy', 'biliardów'],
  ['trylion', 'tryliony', 'trylionów'],
];

const currencyVariation = [' złoty', ' złote', ' złotych'];


function inWord(n) {
  const reszta = ((n - Math.trunc(n)) * 100).toFixed();
  const sufix =  currencyVariation[getGroup(n%1000)];

  return number2words(Math.trunc(n)) + ` ${sufix} ${reszta}/100`;
}

function number2words(n) {
  if (n < 20) return num[n];
  var digit = n % 10;
  if (n < 100) return tens[Math.trunc(n / 10) - 2] + (digit ? ' ' + num[digit] : '');
  if (n < 1000) return hundreds[Math.trunc(n / 100)] + (n % 100 == 0 ? '' : ' ' + number2words(n % 100));

  const pow = getPow(n);
  const dzielnik = 1000 ** pow;
  const baza = Math.trunc(n / dzielnik);
  const group = getGroup(baza);

  return number2words(baza) + ' ' + groups[pow][group] + (n % dzielnik != 0 ? ' ' + number2words(n % dzielnik) : '');
}

function getPow(n) {
  const a = Math.trunc(n / 1000000);
  for (let i = 1; i <= 5; i++) {
    if (a < 1000 ** i && a > 0) return ++i;
  }
  return 1;
}

function getGroup(baza) {
  if (baza === 1) return 0;
  if (baza >= 5 && baza <= 14) return 2;
  switch (baza%10) {
    case 2:
    case 3:
    case 4: return 1;
    default: return 2;
  }
}





console.log(inWord(2123232100.12));

const val = document.querySelector('#val');
const div = document.querySelector('#app');

val.addEventListener('input', function () {
  let n = val.valueAsNumber;
  div.innerHTML = inWord(parseFloat(n ? n : 0));
});
