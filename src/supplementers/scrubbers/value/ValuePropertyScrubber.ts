import BaseValueScrubber from '@src/supplementers/scrubbers/value/BaseValueScrubber';

/**
 * Scrubs all the given `properties` from `Log`s, regardless of their values.
 */
class ValuePropertyScrubber extends BaseValueScrubber<object> {
  private readonly _properties: string[];

  public constructor(properties: string[]) {
    super(['object']);

    this._properties = properties;
  }

  protected _scrubValue(value: object): object {
    const newValue: { [K: string]: unknown } = { ...value };

    this._properties.forEach(property => delete newValue[property]);

    return newValue;
  }
}

export default ValuePropertyScrubber;
