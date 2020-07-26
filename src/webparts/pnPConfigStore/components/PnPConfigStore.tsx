import * as React from 'react';
import styles from './PnPConfigStore.module.scss';
import { IPnPConfigStoreProps } from './IPnPConfigStoreProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web } from '@pnp/sp/webs';
import { Settings, SPListConfigurationProvider } from "@pnp/config-store";

const settings = new Settings();

export default class PnPConfigStore extends React.Component<IPnPConfigStoreProps, {}> {
    private w = null;
    private configProvider: SPListConfigurationProvider = null;
    constructor(props) {
        super(props);
        this.w = Web(this.props.weburl);
        this.configProvider = new SPListConfigurationProvider(this.w, "ConfigList");
    }

    public _getConfigValues = async () => {
        //const wrappedProvider = this.configProvider.asCaching();
        
        await settings.load(this.configProvider);    
        settings.add("mykey", "myvalue");
        settings.apply({
            key2: 'value2'
        });    
        // console.log(this.configProvider.getConfiguration());
        // console.log(settings.get('Key1'));
    }

    public componentDidMount() {
        this._getConfigValues();
    }

    public render(): React.ReactElement<IPnPConfigStoreProps> {
        return (
            <div className={styles.pnPConfigStore}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
