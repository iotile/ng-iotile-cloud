'use strict';

import { Stats } from '../../src/models/stats';

describe('StatsTest', () => {

  it('check that we can create Stats', () => {
    let stats: Stats = new Stats({
      "interval_seconds": 4152106.818,
      "start": "2016-09-13T19:21:27.025000Z",
      "count": 3428,
      "sum": 51323911,
      "interval_days": 48,
      "max": 43928,
      "avg": 14971.969369894981,
      "end": "2016-10-31T20:43:13.843000Z",
      "min": 0
    });
    
    expect(stats).toBeTruthy();
    expect(stats.count).toEqual(3428);
  });

  it('check Stream construction', () => {
    let stats: Stats = new Stats({
      "interval_seconds": 4152106.818,
      "start": "2016-09-13T19:21:27.025000Z",
      "count": 3428,
      "sum": 51323911,
      "interval_days": 48,
      "max": 43928,
      "avg": 14971.969369894981,
      "end": "2016-10-31T20:43:13.843000Z",
      "min": 0
    });

    expect(stats.getFormattedAvg()).toEqual('14971.969');
  });

});