'use strict';

import { Location } from '../../src/models/location';

describe('Location', () => {

  let mockLocation: Location = new Location({
    "id": 178,
    "timestamp": "2018-04-09T16:17:26.464000-07:00",
    "target": "d--0000-0000-0000-0532",
    "lat": "37.406246",
    "lon": "-122.109423",
    "user": "kaylie"
  });

  it('checks basic', () => {
    expect(mockLocation.target).toBe("d--0000-0000-0000-0532");
    expect(mockLocation.timestamp).toEqual("2018-04-09T16:17:26.464000-07:00");
    expect(mockLocation.lat).toBe("37.406246");
    expect(mockLocation.lon).toBe("-122.109423");
    expect(mockLocation.getPosition()).toEqual({ lat: 37.406246, lng: -122.109423 });
  });

});
