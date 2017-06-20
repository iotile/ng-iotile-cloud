'use strict';

import { EventPoint } from '../../iotile/models/eventpoint';

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
      "dirty_ts": false
    });
    expect(point.stream).toEqual("s--0000-0007--0000-0000-0000-0001--6000");
    expect(point.timestamp.getFullYear()).toEqual(2016);
    expect(point.incrementalId).toEqual(1);
    expect(point.dirtyTimestamp).toBeFalsy();
  });

});