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

  // round(): Money {
  //   return new Money(Money.round(this.value));
  // }

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
  // new Money(5.015).add(new Money(0.015)).valueOf(),
  // Money.of(5.015).add(Money.of(0.015)).valueOf(),
  // Money.of(5.015*100).toCurrency(),
  // Money.of(3).percent(50).valueOf(),
  Money.floor(5.011),
  Money.of('12kk')
);