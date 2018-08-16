'use strict';

import { EventPoint } from '../../src/models/eventpoint';

describe('EventPointTest', () => {

  it('check full data api', () => {
    let point: EventPoint = new EventPoint({
      "id": 3,
      "stream": "s--0000-0007--0000-0000-0000-0001--6000",
      "project": "p--0000-0007",
      "device": "d--0000-0000-0000-0001",
      "variable": "v--0000-0007--6000",
      "s3bucket": "iotile-cloud-stream-event-data",
      "s3key": "dev/s--0000-0007--0000-0000-0000-0001--6000/0d0690ac-0dd1-4047-9d28-2ab86a1b0641.json",
      "ext": "json",
      "device_timestamp": null,
      "timestamp": "2016-03-25T05:13:38Z",
      "streamer_local_id": 1,
      "dirty_ts": false,
      "extra_data": {
        "pressure": 4.7,
        "max_g": 0.48828125,
        "min_y": -0.5218505859375,
        "max_z": 0.15869140625,
        "min_z": -0.1953125,
        "max_y": 0.48828125,
        "temperature": 21.1875,
        "max_x": 0.115966796875,
        "min_g": -0.5218505859375,
        "min_x": -0.079345703125,
        "relative_humidity": 35.5859375,
        "foo": "bar"
      }
    });
    expect(point.stream).toEqual("s--0000-0007--0000-0000-0000-0001--6000");
    expect(point.timestamp.getFullYear()).toEqual(2016);
    expect(point.incrementalId).toEqual(1);
    expect(point.dirtyTimestamp).toBeFalsy();
    expect(point.hasRawData).toBeUndefined();
    expect(point.summaryData['pressure']).toEqual(4.7);
    expect(point.summaryData['temperature']).toEqual(21.1875);
    expect(point.summaryData['foo']).toEqual('bar');
    expect(point.summaryData['foobar']).toBeUndefined();
  });

  it('check full data api', () => {
    let point: EventPoint = new EventPoint({
      "id": 102084,
      "stream": "s--0000-00ef--0000-0000-0000-0512--5020",
      "project": "p--0000-00ef",
      "device": "d--0000-0000-0000-0512",
      "variable": "v--0000-00ef--5020",
      "s3bucket": "iotile-cloud-stream-event-data",
      "s3key": "prod/2018/08/15/17/cd290963-36da-465e-9260-62ca6ea6c0da.json",
      "ext": "json",
      "has_raw_data": true,
      "device_timestamp": 989952,
      "timestamp": "2018-01-30T06:33:43-08:00",
      "streamer_local_id": 21176,
      "dirty_ts": false,
      "extra_data": {
        "axis": "z",
        "peak": 1.372,
        "duration": 11,
        "delta_v_x": 0.0193634033203125,
        "delta_v_y": 0.008544921875,
        "delta_v_z": 0.1346893310546875
      }
    });
    expect(point.hasRawData).toBeTruthy();

    point.hasRawData = false;
    expect(point.hasRawData).toBeFalsy();
  });

});
