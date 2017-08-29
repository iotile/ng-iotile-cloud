'use strict';

import { Archive } from '../../iotile/models/archive';

const mockArchive: Archive= new Archive({
  "id": 1,
  "slug": "b--0001-0000-0000-0087",
  "title": "from singapore to hong kong",
  "org": "kt-savers",
  "block": 1,
  "created_on": "2017-08-29T01:04:06.572379Z",
  "created_by": "vanielle"
});

describe('Archive', () => {
  it('checks archive\'s property', () => {
    let archive: Archive = mockArchive;
    expect(archive.slug).toBe('b--0001-0000-0000-0087');
    expect(archive.block).toBe(1);
  });
});
