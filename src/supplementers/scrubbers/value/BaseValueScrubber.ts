import { Log } from '@src/Auditor';
import BaseSupplementer from '@src/supplementers/BaseSupplementer';

const typeOfType = typeof null;

type TypeOfType = typeof typeOfType;

/**
 * Scrubs from the `value` of a `Log`.
 */
abstract class BaseValueScrubber<TValue = unknown> extends BaseSupplementer {
  /**
   * Collection of value types that this `Scrubber` can scrub.
   *
   * If `supplementLog` is called with a log containing a value with a type
   * included in this array, `supplementValue` will be called.
   */
  private _scrubbableTypes: TypeOfType[];

  protected constructor(scrubbableTypes: TypeOfType[]) {
    super();

    this._scrubbableTypes = scrubbableTypes;
  }

  private _isScrubbableValue(value: unknown): value is TValue {
    return this._scrubbableTypes.includes(typeof value);
  }

  public supplementLog(log: Log): Log {
    if (this._isScrubbableValue(log.value)) {
      return {
        ...log,
        value: this._scrubValue(log.value)
      };
    }

    return log;
  }

  protected abstract _scrubValue(value: TValue): TValue;
}

export default BaseValueScrubber;
