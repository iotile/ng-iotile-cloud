'use strict';

import { ApiFilter } from '../../src/models/apifilter';

describe('ApiFilter', () => {

  it('check ApiFilter add filter', () => {
    let filter: ApiFilter = new ApiFilter();
    filter.addFilter('foo', 'bar');
    filter.addFilter('abc', '5');
    expect(filter.filterString()).toEqual('?foo=bar&abc=5');
  });

  it('check ApiFilter add same filter', () => {
    let filter: ApiFilter = new ApiFilter();
    filter.addFilter('foo', 'bar');
    filter.addFilter('abc', '5');
    filter.addFilter('abc', '9');
    expect(filter.filterString()).toEqual('?foo=bar&abc=5&abc=9');
  });

  it('check ApiFilter remove filter', () => {
    let filter: ApiFilter = new ApiFilter();
    filter.addFilter('foo', 'bar');
    filter.addFilter('abc', '5');
    filter.removeFilter('foo');
    expect(filter.filterString()).toEqual('?abc=5');
  });

  it('check ApiFilter add unique filter', () => {
    let filter: ApiFilter = new ApiFilter();
    filter.addFilter('foo', 'bar');
    filter.addFilter('abc', '5');
    filter.addFilter('abc', '9', true);
    expect(filter.filterString()).toEqual('?foo=bar&abc=9');
  });

});