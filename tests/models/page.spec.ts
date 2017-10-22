'use strict';
import { Page } from '../../src/models/page';

describe('PageTest', () => {

  it('check basic device', () => {
    let page: Page = new Page('https://iotile.cloud/api/v1/data/?a=b', 2, 5);
    expect(page.page).toEqual(2);
    expect(page.pageCount).toEqual(5);
    expect(page.pageUrl()).toEqual('https://iotile.cloud/api/v1/data/?a=b&page=2');
  });
});
