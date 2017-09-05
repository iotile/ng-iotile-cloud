'use strict';

import { DataBlock } from '../../iotile/models/datablock';

describe('DataBlock', () => {
  it('checks basic DataBlock', () => {
    let archive: DataBlock = new DataBlock({
      "id": 1,
      "slug": "b--0001-0000-0000-0087",
      "title": "from singapore to hong kong",
      "org": "kt-savers",
      "sg": "saver-v1-1-0",
      "block": 1,
      "created_on": "2017-08-29T01:04:06.572379Z",
      "created_by": "vanielle"
    });

    expect(archive.slug).toBe('b--0001-0000-0000-0087');
    expect(archive.sensorGraphSlug).toBe('saver-v1-1-0');
    expect(archive.title).toBe('from singapore to hong kong');
    expect(archive.org).toBe('kt-savers');
    expect(archive.block).toBe(1);
  });

  describe('getPostPayload()', () => {
    it('checks basic method withou description', () => {
      let archive: DataBlock = new DataBlock({
        "id": 1,
        "slug": "d--0000-0000-0000-0087",
        "title": "from san jose to south korea",
        "org": "kt-savers",
        "sg": "saver-v1-1-0",
        "block": 1,
        "created_on": "2017-08-29T01:04:06.572379Z",
        "created_by": "vanielle"
      });

      let payload = archive.getPostPayload();
      expect(payload.device).toBe('d--0000-0000-0000-0087');
      expect(payload.title).toBe('from san jose to south korea');
      expect(payload.description).toBeUndefined()
    });

    it('checks method with description', () => {
      let archive: DataBlock = new DataBlock({
        "id": 1,
        "slug": "d--0000-0000-0000-0087",
        "title": "from san jose to south korea",
        "org": "kt-savers",
        "sg": "saver-v1-1-0",
        "block": 1,
        "created_on": "2017-08-29T01:04:06.572379Z",
        "created_by": "vanielle",
        "description": "Shipment from South Jose to South Korea via cargo."
      });

      let payload = archive.getPostPayload();
      expect(payload.description).toBe('Shipment from South Jose to South Korea via cargo.');
    });
  });
});
