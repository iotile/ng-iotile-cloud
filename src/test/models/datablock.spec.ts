'use strict';

import { DataBlock } from '../../iotile/models/datablock';

const mockArchive: DataBlock= new DataBlock({
  "id": 1,
  "slug": "b--0001-0000-0000-0087",
  "title": "from singapore to hong kong",
  "org": "kt-savers",
  "sg": "saver-v1-1-0",
  "block": 1,
  "created_on": "2017-08-29T01:04:06.572379Z",
  "created_by": "vanielle"
});

describe('DataBlock', () => {
  it('checks basic DataBlock', () => {
    let archive: DataBlock = mockArchive;
    expect(archive.slug).toBe('b--0001-0000-0000-0087');
    expect(archive.sensorGraphSlug).toBe('saver-v1-1-0');
    expect(archive.title).toBe('from singapore to hong kong');
    expect(archive.org).toBe('kt-savers');
    expect(archive.block).toBe(1);
  });
});
