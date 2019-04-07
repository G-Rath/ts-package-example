import { Log } from '@src/Auditor';
import BaseSupplementer from '@src/supplementers/BaseSupplementer';

/**
 * Collects information to add to a `log` under the given `property` key.
 */
abstract class BasePropertyCollector<T = unknown> extends BaseSupplementer {
  private readonly _propertyKey: string;

  protected constructor(propertyKey: string) {
    super();

    this._propertyKey = propertyKey;
  }

  public supplementLog(log: Log<unknown>): Log<unknown> {
    return {
      ...log,
      [this._propertyKey]: this._collectPropertyValue()
    };
  }

  protected abstract _collectPropertyValue(): T;
}

export default BasePropertyCollector;
