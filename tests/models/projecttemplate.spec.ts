'use strict';

import { ProjectTemplate } from '../../src/models/projecttemplate';

describe('ProjectTemplateTest', () => {

  it('check project template constructor', () => {
    let pt: ProjectTemplate = new ProjectTemplate({
      "id": 7,
      "name": "Shipping Template",
      "slug": "shipping-template-v1-0-0",
      "org": "arch-systems",
      "version": "v1.0.0",
      "extra_data": {
        "web": {
          "projectTemplateSlug": "shipping"
        }
      },
      "created_on": "2017-08-29T21:05:56.438500Z"
    });
    expect(pt.id).toEqual(7);
    expect(pt.name).toEqual('Shipping Template');
    expect(pt.slug).toEqual('shipping-template-v1-0-0');
    expect(pt.org).toEqual('arch-systems');
    expect(pt.version).toEqual('v1.0.0');
    expect(pt.extraData['web']['projectTemplateSlug']).toEqual('shipping');
  });

});