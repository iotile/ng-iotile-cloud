export class Permissions {
  // Can delete Org
  public canDeleteOrg: boolean;

  // Can Invite and delete members, and change member attributes
  public canManageUsers: boolean;

  // Can manage Fleets and OTA Deployments
  public canManageOta: boolean;

  // Can Create, Delete and modify Projects (including project properties)
  public canManageOrgAndProjects: boolean;

  // Can Claim devices into Org projects
  public canClaimDevices: boolean;

  // Can modify device information, including properties
  public canModifyDevice: boolean;

  // Can view device properties
  public canReadDeviceProperties: boolean;

  // Can modify device properties
  public canModifyDeviceProperties: boolean;

  // Can read notes
  public canReadNotes: boolean;

  // Can access Device Location
  public canReadDeviceLocations: boolean;

  // Can read stream data and events
  public canReadStreamData: boolean;

  // Can manually post stream data and events via JSON POST API
  public canCreateStreamData: boolean;

  // Can archive Device data
  public canCreateDatablock: boolean;

  // Can access Archived data
  public canAccessDatablock: boolean;

  // Can access Org pages from WebApp
  public canAccessWebapp: boolean;

  // Can access generated report
  public canAccessReports: boolean;

  // Can create generated report
  public canCreateReports: boolean;

  // Can access Classic (strato)
  public canAccessClassic: boolean;

  constructor(data: any = {}) {
    this.canDeleteOrg = data['can_delete_org'];
    this.canManageUsers = data['can_manage_users'];
    this.canManageOta = data['can_manage_ota'];
    this.canManageOrgAndProjects = data['can_manage_org_and_projects'];
    this.canClaimDevices = data['can_claim_devices'];
    this.canModifyDevice = data['can_modify_device'];
    this.canReadDeviceProperties = data['can_read_device_roperties'];
    this.canModifyDeviceProperties = data['can_modify_device_properties'];
    this.canReadNotes = data['can_read_notes'];
    this.canReadDeviceLocations = data['can_read_device_locations'];
    this.canReadStreamData = data['can_read_stream_data'];
    this.canCreateStreamData = data['can_create_stream_data'];
    this.canCreateDatablock = data['can_create_datablock'];
    this.canAccessDatablock = data['can_access_datablock'];
    this.canAccessWebapp = data['can_access_webapp'];
    this.canAccessReports = data['can_access_reports'];
    this.canCreateReports = data['can_create_reports'];
    this.canAccessClassic = data['can_access_classic'];
  }
}
