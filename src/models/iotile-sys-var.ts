/**
 * Refer to the link for list of SysVar available on Classic:
 * https://github.com/iotile/strato/blob/master/server/apps/utils/iotile/variable.py
 */

export class IOTileSysVar {
  public battery: string = '5800';

  public gatewayScanBegin: string = '5a00';
  public gatewayScanEnd: string = '5a01';
  public gatewayScanFailure: string = '5a03';
  public endOfTripSummary: string = '5a07';
  public middleOfTripSummary: string = '5a08';
  public deviceDataMask: string = '5a09';

  public reboot: string = '5c00';

  public tripStarted: string = '0e00';
  public tripEnded: string = '0e01';
  public tripRecording: string = '0e02';
}
