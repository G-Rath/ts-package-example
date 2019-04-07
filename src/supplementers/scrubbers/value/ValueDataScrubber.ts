import BaseValueScrubber from '@src/supplementers/scrubbers/value/BaseValueScrubber';

/**
 * Scrubs the values of all the given `properties` from `Log`s, replacing them with another.
 */
class ValueDataScrubber extends BaseValueScrubber<object> {
  private readonly _properties: string[];
  private readonly _replacementMessage: string;

  public constructor(properties: string[], replacementMessage = '[SCRUBBED]') {
    super(['object']);

    this._properties = properties;
    this._replacementMessage = replacementMessage;
  }

  protected _scrubValue(value: object): object {
    const newValue: { [K: string]: unknown } = { ...value };

    this._properties.forEach(property => newValue[property] = this._replacementMessage);

    return newValue;
  }
}

export default ValueDataScrubber;
