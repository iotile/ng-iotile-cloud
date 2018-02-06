'use strict';

import { OrgTemplate } from '../../src/models/org-template';

describe('OrgTemplate', () => {

  it('check basic model', () => {
    let orgTemplate: OrgTemplate = new OrgTemplate({
      "id": 1,
      "name": "Default Template",
      "slug": "default-template-v1-0-0",
      "version": "v1.0.0",
      "extra_data": {
        "web": {
          "orgTemplateSlug": "default"
        }
      },
      "created_on": "2018-01-31T01:18:30Z"
    });

    expect(orgTemplate.id).toBe(1);
    expect(orgTemplate.name).toBe("Default Template")
    expect(orgTemplate.slug).toBe("default-template-v1-0-0")
    expect(orgTemplate.version).toBe("v1.0.0");
    expect(orgTemplate.createdOn.getFullYear()).toBe(2018);
  });

  it('getExtraData', () => {
    let orgTemplate: OrgTemplate = new OrgTemplate({
      "id": 1,
      "name": "Default Template",
      "slug": "default-template-v1-0-0",
      "version": "v1.0.0",
      "extra_data": {
        "web": {
          "orgTemplateSlug": "default"
        }
      },
      "created_on": "2018-01-31T01:18:30Z"
    });

    let orgTemplate2: OrgTemplate = new OrgTemplate({
      "id": 1,
      "name": "Default Template",
      "slug": "default-template-v1-0-0",
      "version": "v1.0.0",
      "extra_data": null,
      "created_on": "2018-01-31T01:18:30Z"
    });

    expect(orgTemplate.getExtraData()).toBe(orgTemplate.extraData.web);
    expect(orgTemplate2.getExtraData()).toBeUndefined();
  });
});
