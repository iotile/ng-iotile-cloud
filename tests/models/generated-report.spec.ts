'use strict';

import { GeneratedReport, ReportPostPayoad } from '../../src/models';

describe('GeneratedGeneratedReport', () => {

  it('check basic model', () => {
    let report: GeneratedReport = new GeneratedReport({
      "id": "98112efa-b09b-412e-8937-ef7223033288",
      "label": "stream_overview: b--0008-0000-0000-053a",
      "source_ref": "b--0008-0000-0000-053a",
      "user_info": {
        "username": "@david.karchmer",
        "slug": "davidkarchmer",
        "tiny_avatar": "https://secure.gravatar.com/avatar/8263c80c650435c2f578803d6853c4b1?d=identicon&s=28"
      },
      "url": null,
      "created_on": "2018-05-05T16:32:31Z",
      "created_by": "davidkarchmer",
      "org": "karchmer",
      "index_file": {
        "id": "98112efa-b09b-412e-8937-ef7223033288",
        "title": "stream_overview: b--0008-0000-0000-053a",
        "url": "https://iotile-cloud-reports.s3.amazonaws.com/prod/shared/karchmer/98112efa-b09b-412e-8937-ef7223033288/out.html?AWSAccessKeyId=ASIAJ3BO4OTWONQYIQ3A&Signature=Eg7Y0YSHOV4o7l3acbRRXnE9rAY%3D&x-amz-security-token=FQoDYXdzEPj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDFK2xY3NW1tjdqlSViK3A%2Bg%2BUIvM3Ha1lX2fQVkoqvBHr6eE%2BMhBPKqCR%2FLjonaWE4hiu4iADUPxiyasck%2BVGl2Owu1QoFbAKtYKFVOt%2FXfMcRSAEWzAZSP1S06NUz%2FIu6EBdOCRJUwHGC6L5uYDqi3B84nt%2BIN8I%2B4QTLrS7QghfQH%2FhTuHBxZGgy5BhyAnL7UxGMfh5bKolgl6cmeOchayQFmkDWkFuEmN7CgocLARz0CbDS%2BtCGhAPPS35J%2B30Ubv15wXrLG7OdTfA0TP2g40uPx9VYTml0PDKKIjyeTbbWXsaq0mpH8VkrKstLf93HeSTvlW4Cu9AvHbcFvQ0uLvWTLpitwUww0TmITQ7oUy8yCglJLbLv3f9ReibxkvrJ%2F1RXc3pky6h9eoiwqRKroH913jD4QEoXQgmAIAw%2Bw2hWG4hqbr9DagdMZCzJeIEqtdin1RjfTXl3N%2BcMgh9uJU5NsZWsZ6463RXJI%2Bv7TSbJ3LEaBdL8CQe3yxWZJjDAMm%2BcEEAG0p3KNto3mIaIOhrVMgCClqAQmt1XiF1aqEwgeHzAl1VvTkXIR%2FrRf5RlMqb5TOAc%2BlHojyAGyuv8X6KxFer2so6JDT1wU%3D&Expires=1526000319",
        "file_type": "html",
        "created_on": "2018-05-05T16:32:33Z",
        "created_by": 31
      },
      "status": "G1"
    });

    expect(report.id).toBe('98112efa-b09b-412e-8937-ef7223033288');
    expect(report.label).toBe('stream_overview: b--0008-0000-0000-053a');
    expect(report.sourceRef).toBe('b--0008-0000-0000-053a');
    expect(report.createdOn.getFullYear()).toBe(2018);
    expect(report.createdBy).toBe('davidkarchmer');
    expect(report.org).toBe('karchmer');
    expect(report.status).toBe('G1');
    expect(report.url).toBe('');

    expect(report.userInfo.username).toBe('@david.karchmer');
    expect(report.userInfo.slug).toBe('davidkarchmer');
    expect(report.userInfo.avatarUrl).toBe('https://secure.gravatar.com/avatar/8263c80c650435c2f578803d6853c4b1?d=identicon&s=28');

    expect(report.indexFile.id).toBe('98112efa-b09b-412e-8937-ef7223033288');
    expect(report.indexFile.title).toBe('stream_overview: b--0008-0000-0000-053a');
    expect(report.indexFile.fileType).toBe('html');
    expect(report.indexFile.createdOn.getFullYear()).toBe(2018);
    expect(report.indexFile.createdBy).toBe(31);
  });

  it('checks report\'s without index file', () => {
    let report: GeneratedReport = new GeneratedReport({
      "id": "98112efa-b09b-412e-8937-ef7223033288",
      "label": "stream_overview: b--0008-0000-0000-053a",
      "source_ref": "b--0008-0000-0000-053a",
      "url": null,
      "created_on": "2018-05-05T16:32:31Z",
      "created_by": "davidkarchmer",
      "org": "karchmer",
      "index_file": null,
      "status": "G1"
    });

    expect(report.userInfo).toBeFalsy();
  });

  it('checks basic getPostPayload', () => {
    let report: GeneratedReport = new GeneratedReport({
      "id": "98112efa-b09b-412e-8937-ef7223033288",
      "label": "stream_overview: b--0008-0000-0000-053a",
      "source_ref": "b--0008-0000-0000-053a",
      "url": null,
      "created_on": "2018-05-05T16:32:31Z",
      "created_by": "davidkarchmer",
      "org": "karchmer",
      "index_file": null,
      "status": "G1"
    });

    let payload: ReportPostPayoad = report.getPostPayload();

    expect(payload.label).toEqual('stream_overview: b--0008-0000-0000-053a');
    expect(payload.org).toEqual('karchmer');
    expect(payload.status).toEqual('G1');
    expect(payload.source_ref).toEqual('b--0008-0000-0000-053a');
  });

  it('checks error getPostPayload', () => {
    let report: GeneratedReport = new GeneratedReport({
      "id": "98112efa-b09b-412e-8937-ef7223033288",
      "label": "",
      "source_ref": "b--0008-0000-0000-053a",
      "url": null,
      "created_on": "2018-05-05T16:32:31Z",
      "created_by": "davidkarchmer",
      "org": "karchmer",
      "index_file": null,
      "status": "G1"
    });

    expect(function() {report.getPostPayload()}).toThrowError()
  });
});
