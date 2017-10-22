'use strict';

import { DataPoint } from '../../src/models/datapoint';

describe('DataPointTest', () => {

  it('check old scheme', () => {
    let point: DataPoint = new DataPoint({
        "type": "Num",
        "timestamp": "2016-09-13T20:29:13.825000Z",
        "int_value": 268205,
        "value": null,
        "display_value": "4",
        "output_value": null
    });
    expect(point.timestamp.getFullYear()).toEqual(2016);
    expect(point.rawValue).toEqual(268205);
    expect(point.value).toBeNull();
    expect(point.displayValue).toEqual('4');
    expect(point.outValue).toBeNull();
  });

  it('check new scheme', () => {
    let point: DataPoint = new DataPoint({
        "type": "ITR",
        "timestamp": "2016-09-13T20:29:13.825000Z",
        "streamer_local_id": 28027,
        "int_value": 268205,
        "value": 4.23,
        "display_value": "4",
        "output_value": 8.25
    });
    expect(point.timestamp.getFullYear()).toEqual(2016);
    expect(point.rawValue).toEqual(268205);
    expect(point.value).toEqual(4.23);
    expect(point.displayValue).toEqual('4');
    expect(point.outValue).toEqual(8.25);
    expect(point.incrementalId).toEqual(28027);
  });

  it('check full data api', () => {
    let point: DataPoint = new DataPoint({
      "id": 880971,
      "stream": "s--0000-006f--0000-0000-0000-00ae--5001",
      "project": "p--0000-006f",
      "device": "d--0000-0000-0000-00ae",
      "variable": "v--0000-006f--5001",
      "type": "ITR",
      "device_timestamp": 9159600,
      "timestamp": "2017-05-31T23:26:16Z",
      "int_value": 2763,
      "value": 67.4725274725275,
      "streamer_local_id": 28027,
      "dirty_ts": false
    });
    expect(point.stream).toEqual("s--0000-006f--0000-0000-0000-00ae--5001");
    expect(point.timestamp.getFullYear()).toEqual(2017);
    expect(point.rawValue).toEqual(2763);
    expect(point.value).toEqual(67.4725274725275);
    expect(point.displayValue).toBeUndefined();
    expect(point.outValue).toBeUndefined();
    expect(point.incrementalId).toEqual(28027);
    expect(point.dirtyTimestamp).toBeFalsy();
  });

});