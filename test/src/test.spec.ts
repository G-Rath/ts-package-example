import Auditor from '@src/Auditor';
import CounterCollector from '@src/supplementers/collectors/CounterCollector';
import TimeStampCollector from '@src/supplementers/collectors/TimeStampCollector';
import ValueDataScrubber from '@src/supplementers/scrubbers/value/ValueDataScrubber';

describe('test', () => {
  const auditor = new Auditor();

  auditor.register(new TimeStampCollector());
  auditor.register(new CounterCollector());
  // auditor.register(new ValuePropertyScrubber(['target']));
  auditor.register(new ValueDataScrubber(['target']));

  auditor.log<string>('hello world');
  auditor.log('hello sunshine');
  auditor.log({ message: 'hello', target: 'world' });

  console.log(auditor.trail);

  it('does things', () => {
    expect(true).toBe(true);
  });
});
