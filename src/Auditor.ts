import { Supplementer } from '@src/supplementers/Supplementer';

export interface Log<T = unknown> {
  value: T;
}

class Auditor {
  private _trail: Log[] = [];
  private _supplementers: Supplementer[] = [];

  //#region getters & setters
  public get trail(): ReadonlyArray<Readonly<Log>> {
    return this._trail.map(log => ({ ...log }));
  }

  //#endregion

  public register(supplementer: Supplementer) {
    this._supplementers.push(supplementer);

    supplementer.register(this);
  }

  public deregister(supplementer: Supplementer) {
    this._supplementers = this._supplementers.filter(aSupplementer => aSupplementer !== supplementer);

    supplementer.deregister();
  }

  public log<T = unknown>(value: T): Log<T> {
    const log = this._supplementLog({ value });

    this._trail.push(log);

    return { ...log };
  }

  private _supplementLog<T = unknown>(log: Log<T>): Log<T> {
    return this._supplementers.reduce((composedLog, supplementer) => supplementer.supplementLog(composedLog), log);
  }
}

export default Auditor;

/*
auditor.log(1);
auditor.log({ hello: 'world'});
 */
