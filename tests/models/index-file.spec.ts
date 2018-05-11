'use strict';

import { IndexFile } from '../../src/models';

describe('IndexFileTest', () => {

  it('check full data api', () => {
    let indexFile: IndexFile = new IndexFile({
      "id": "98112efa-b09b-412e-8937-ef7223033288",
      "title": "stream_overview: b--0008-0000-0000-053a",
      "url": "https://iotile-cloud-reports.s3.amazonaws.com/",
      "file_type": "html",
      "created_on": "2018-05-05T16:32:33Z",
      "created_by": 31
    });

    expect(indexFile.id).toEqual("98112efa-b09b-412e-8937-ef7223033288");
    expect(indexFile.title).toEqual("stream_overview: b--0008-0000-0000-053a");
    expect(indexFile.url).toEqual('https://iotile-cloud-reports.s3.amazonaws.com/');
    expect(indexFile.fileType).toEqual("html");
    expect(indexFile.createdOn.getFullYear()).toEqual(2018);
    expect(indexFile.createdBy).toEqual(31);
  });

});
