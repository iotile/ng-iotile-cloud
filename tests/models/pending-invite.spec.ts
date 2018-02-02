'use strict';

import { PendingInvite } from '../../src/models/pending-invite';

describe('PendingInvite', () => {

  it('check basic model', () => {
    let pendingInvite: PendingInvite = new PendingInvite({
      "email": "vanielle@arch-iot.com",
      "sent_on": "2018-01-31T02:45:59Z",
      "sent_by": "david@arch-iot.com"
    });

    expect(pendingInvite.email).toBe('vanielle@arch-iot.com');
    expect(pendingInvite.sentOn.getFullYear()).toBe(2018);
    expect(pendingInvite.sentBy).toBe('david@arch-iot.com');
  });

});
