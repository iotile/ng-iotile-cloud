'use strict';

import { ApiFilter } from '../../iotile/models/apifilter';

describe('ApiFilter', () => {

  it('check ApiFilter basic functionality', () => {
    let filter: ApiFilter = new ApiFilter();
    filter.addFilter('foo', 'bar');
    filter.addFilter('abc', '5');
    expect(filter.filterString()).toEqual('?foo=bar&abc=5');
  });

});