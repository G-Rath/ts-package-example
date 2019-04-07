import BasePropertyCollector from '@src/supplementers/collectors/BasePropertyCollector';

class CounterCollector extends BasePropertyCollector<number> {
  private _counter: number = 0;

  public constructor(propertyKey: string = 'count') {
    super(propertyKey);
  }

  protected _collectPropertyValue() {
    return (this._counter += 1);
  }
}

export default CounterCollector;
