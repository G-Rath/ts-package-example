import { Supplementer } from '@src/supplementers/Supplementer';
import { EventEmitter } from 'events';

export interface Log<T = unknown> {
  value: T;
}

export enum AuditorEvent {
  Log = 'e:log'
}

class Auditor extends EventEmitter {
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

  public log<T = unknown>(value: T): Log {
    const log = this._supplementLog({ value });

    this._trail.push(log);
    this.emit(AuditorEvent.Log, { log });

    return { ...log };
  }

  private _supplementLog(log: Log): Log {
    return this._supplementers.reduce((composedLog, supplementer) => supplementer.supplementLog(composedLog), log);
  }
}

export type EventListener<T = never> = (event: T) => void;

/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
interface Auditor extends EventEmitter {
  //#region SocketEvent.Close
  emit(event: AuditorEvent.Log, data: Auditor.LogEvent): boolean;

  on(event: AuditorEvent.Log, data: EventListener<Auditor.LogEvent>): this;

  addListener(event: AuditorEvent.Log, data: EventListener<Auditor.LogEvent>): this;

  off(event: AuditorEvent.Log, data: EventListener<Auditor.LogEvent>): this;

  once(event: AuditorEvent.Log, listener: EventListener<Auditor.LogEvent>): this;

  prependListener(event: AuditorEvent.Log, listener: EventListener<Auditor.LogEvent>): this;

  prependOnceListener(event: AuditorEvent.Log, listener: EventListener<Auditor.LogEvent>): this;

  removeListener(event: AuditorEvent.Log, listener: EventListener<Auditor.LogEvent>): this;

  rawListeners(event: AuditorEvent.Log): Array<EventListener<Auditor.LogEvent>>;

  removeAllListeners(event?: AuditorEvent.Log): this;

  //#endregion
}

namespace Auditor {
  export interface LogEvent {
    log: Log;
  }
}

export default Auditor;
