
export class DeviceGlobalId {
    public id: number;

    public constructor(id: number) {
        this.id = id;
    }


    /**
     *
     * This class represents a Device ID
     * It helps converts a device id like 0x20 to a string slug of
     * the form:
     * d--XXXX-XXXX-XXXX-XXXX
     *
     * The slug always has the hex string in lowercase.
     *
     */
    public toString(): string {
        let hexString = Number(this.id).toString(16);

        while (hexString.length < 16) {
            hexString = '0' + hexString;
        }

        hexString = hexString.toLowerCase();
        return 'd--' + hexString.substr(0, 4) + '-' + hexString.substr(4, 4) + '-' + hexString.substr(8, 4) + '-' + hexString.substr(12, 4);
    }
}