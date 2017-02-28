'use strict';

import { DataPoint } from '../../iotile/models/datapoint';

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
    expect(point.value).toEqual(null);
    expect(point.displayValue).toEqual('4');
    expect(point.outValue).toEqual(null);
  });

  it('check new scheme', () => {
    let point: DataPoint = new DataPoint({
        "type": "ITR",
        "timestamp": "2016-09-13T20:29:13.825000Z",
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
  });

});