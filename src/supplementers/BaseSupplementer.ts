import Auditor, { Log } from '@src/Auditor';
import { Supplementer } from '@src/supplementers/Supplementer';

abstract class BaseSupplementer implements Supplementer {
  protected _auditor?: Auditor;

  //#region getters & setters
  /**
   * Gets the {@link Auditor} this `Supplementer` is registered with.
   *
   * If the `Supplementer` is not registered to a `Auditor`, an error will be thrown,
   * meaning this method should only be used when you require the `Supplementer` to be registered.
   *
   * @return {Auditor}
   *
   * @throws {Error} when this `Supplementer` isn't registered to a `Auditor`.
   */
  public get auditor(): Auditor {
    if (this._auditor === undefined) {
      throw new Error();
    }

    return this._auditor;
  }

  //#endregion

  public register(auditor: Auditor): void {
    this._auditor = auditor;
  }

  public deregister(): void {
    this._auditor = undefined;
  }

  public abstract supplementLog<T = unknown>(log: Log<T>): Log<T>;
}

export default BaseSupplementer;
