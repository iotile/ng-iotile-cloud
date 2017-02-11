'use strict';

import { DataPoint } from '../datapoint';

describe('DataPointTest', () => {

  it('check basic point', () => {
    let point: DataPoint = new DataPoint({
        "type": "Num",
        "timestamp": "2016-09-13T20:29:13.825000Z",
        "int_value": 268205,
        "obj_value": null,
        "display_value": "4"
    });
    expect(point.timestamp.getFullYear()).toEqual(2016);
    expect(point.value).toEqual(268205);
    expect(point.displayValue).toEqual('4');
  });

});