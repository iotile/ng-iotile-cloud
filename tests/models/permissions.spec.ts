'use strict';

import { Permissions } from '../../src/models/permissions';

describe('PermissionsTest', () => {

  it('checks basic model', () => {
    let permissions: Permissions = new Permissions({
      "can_create_datablock": true,
      "can_read_stream_data": true,
      "can_read_device_properties": true,
      "can_claim_devices": true,
      "can_manage_org_and_projects": true,
      "can_access_classic": true,
      "can_modify_device_properties": true,
      "can_access_webapp": true,
      "can_access_datablock": true,
      "can_access_companion": true,
      "can_modify_device": true,
      "can_modify_stream_variables": false,
      "can_delete_org": false,
      "can_manage_users": true,
      "can_read_notes": true,
      "can_read_device_locations": true,
      "can_create_stream_data": true,
      "can_upload_streamer_report": true,
      "can_manage_ota": true,
      "can_access_reports": true,
      "can_create_reports": false
    });

    expect(permissions.canManageUsers).toBe(true);
    expect(permissions.canReadDeviceLocations).toBe(true);
    expect(permissions.canCreateDatablock).toBe(true);
    expect(permissions.canAccessWebapp).toBe(true);
    expect(permissions.canDeleteOrg).toBe(false);
    expect(permissions.canAccessReports).toBe(true);
    expect(permissions.canCreateReports).toBe(false);
  });
});
