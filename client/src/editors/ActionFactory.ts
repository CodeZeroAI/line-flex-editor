import {ActionJson} from "../components/Definitions";

export interface ActionProperty {
    label: string,              // Label to be displayed in dropdown box
    icon: string,               // Icon to be displayed in dropdown box
    values: {
        name: string, label: string
    }[],
    description: string,
    uriPrefix?: string
}

export class ActionFactory {

    // private static ACTION_LABEL_VALUE = {name: 'label', label: 'Label'};
    public static ACTION_PROPERTIES: {
        [key: string]: ActionProperty
    } = {
        'message': {
            label: 'Message', icon: 'typography', values: [
                {label: 'Text', name: 'text'}
            ]
            , description: 'Send a text message'
        },
        'postback': {
            label: 'Postback', icon: 'wave', values: [
                {label: 'Text', name: 'displayText'}, {label: 'Data', name: 'data'}]
            , description: 'Display a text message and send postback data'
        },
        'uri': {
            label: 'Open website', icon: 'link', values: [
                {label: 'URL', name: 'uri'}]
            , description: 'Open a website using in-app browser'
        },
        'datetimepicker': {
            label: 'Datetime picker', icon: 'calendar2', values: []
            , description: 'Open date and time picker'
        },
        'camera': {
            label: 'Camera', icon: 'camera', values: [], uriPrefix: 'line://nv/camera/'
            , description: 'Open camera'
        },
        'camera_roll': {
            label: 'Image', icon: 'file-picture', values: [], uriPrefix: 'line://nv/cameraRoll/single'
            , description: 'Open photo album. User can only select 1 photo from the album'
        },//, uriData: 'line://nv/cameraRoll/single'},
        'images': {
            label: 'Multiple images', icon: 'stack-picture', values: [], uriPrefix: 'line://nv/cameraRoll/multi'
            , description: 'Open photo album. User can only select multiple photos from the album'
        },//, uriData: 'line://nv/cameraRoll/multi'},
        'location': {
            label: 'Location', icon: 'location3', values: [], uriPrefix: 'line://nv/location/'
            , description: 'Open map for the user to share location'
        },//, uriData: 'line://nv/location/'},
        'add': {
            label: 'Add friend', icon: 'user-plus', values: [
                {label: 'Account ID', name: ':uri'}], uriPrefix: 'line://ti/p/'
            , description: 'Open an Add Friend screen of a specified account'
        },//, uriData: 'line://ti/p/:value', valueLabel: 'Account ID'},
        'share': {
            label: 'Share to friends',
            icon: 'share3',
            values: [{label: 'Account ID', name: ':uri'}],
            uriPrefix: 'line://nv/recommendOA/'
            ,
            description: 'Open a recommend screen that allows the user to share a specified account to his/her friends'
            // uriData: 'line://nv/recommendOA/:value',
            // valueLabel: 'Account ID'
        },
        'liff': {
            label: 'Open Liff', icon: 'pyramid2',
            values: [{label: 'App ID', name: ':uri'}],
            uriPrefix: 'line://app/'
            , description: 'Open a specified Liff App'
        }// uriData: 'line://app/:value', valueLabel: 'App ID'}
    };

    public static parseActionJson(actionJson?: ActionJson): { type: string, value: string | null } {
        if (!actionJson) {
            return {value: '', type: 'message'};
        }
        if (actionJson.type == 'uri') {
            for (let actionType in this.ACTION_PROPERTIES) {
                const property = this.ACTION_PROPERTIES[actionType];
                if (property.uriPrefix) {
                    return {
                        type: actionType,
                        value: actionJson.data ? actionJson.data.replace(property.uriPrefix, '') : null
                    }
                }

            }
            return {
                type: 'uri', value: actionJson.data || null
            }
        }
        return {
            type: actionJson.type,
            value: actionJson.data || null
        }
    }

    public static getActionDropdownSelector() {
        const ret: { label: string, value: string, icon: string, description: string }[] = [];
        for (let actionType in this.ACTION_PROPERTIES) {
            const prop = this.ACTION_PROPERTIES[actionType];
            ret.push({
                label: prop.label, icon: prop.icon, value: actionType, description: prop.description
            })
        }
        return ret;
    }

    public static getActionJson(type: string, values: string[]): ActionJson {
        const property = this.ACTION_PROPERTIES[type];
        const label = values.splice(0, 1)[0];
        if (property.uriPrefix) {
            return {
                type: 'uri', uri: property.uriPrefix + values.join(','), label: label
            }
        }
        const ret: any = {};
        ret.type = type;
        ret.label = label;
        for (let i in property.values) {
            const valueProperty = property.values[i];
            ret[valueProperty.name] = values[i];
        }
        return ret;
    }

}