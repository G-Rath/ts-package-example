import Auditor, { Log } from '@src/Auditor';

export interface Supplementer {
  register(auditor: Auditor): void;

  deregister(): void;

  supplementLog(log: Log): Log;
}
