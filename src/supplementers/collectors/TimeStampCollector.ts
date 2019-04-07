import BasePropertyCollector from '@src/supplementers/collectors/BasePropertyCollector';

class TimeStampCollector extends BasePropertyCollector<Date> {
  public constructor(propertyKey: string = 'timestamp') {
    super(propertyKey);
  }

  protected _collectPropertyValue() {
    return new Date();
  }
}

export default TimeStampCollector;
