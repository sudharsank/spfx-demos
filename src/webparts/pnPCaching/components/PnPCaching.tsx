import * as React from 'react';
import styles from './PnPCaching.module.scss';
import { IPnPCachingProps } from './IPnPCachingProps';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import { dateAdd } from '@pnp/common';

export interface IPnPCachingState {
    loading: boolean;
    result: any;
}

export default class PnPCaching extends React.Component<IPnPCachingProps, IPnPCachingState> {

    constructor(props: IPnPCachingProps) {
        super(props);
        this.state = {
            loading: false,
            result: null
        };
    }

    public _usingGlobalConfig = async () => {
        this.setState({ loading: true, result: null });
        let depts = await sp.web.lists.getByTitle('Department').items.usingCaching().get();
        this.setState({ loading: false, result: JSON.stringify(depts, null, 4) });
    }

    public _usingPerCallCache = async () => {
        this.setState({ loading: true, result: null });
        let regions = await sp.web.lists.getByTitle("Region").items.usingCaching({
            key: 'PnP_Region',
            expiration: dateAdd(new Date(), 'minute', 5),
            storeName: 'local'
        }).get();
        this.setState({ loading: false, result: JSON.stringify(regions, null, 4) });
    }

    public render(): React.ReactElement<IPnPCachingProps> {
        return (
            <div className={styles.pnPCaching}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DefaultButton onClick={this._usingGlobalConfig}>Get Departments (using global cache)</DefaultButton>
                            <DefaultButton onClick={this._usingPerCallCache}>Get Regions (using per call cache)</DefaultButton>
                            {this.state.loading &&
                                <div><h4>Please wait, loading...</h4></div>
                            }
                            {this.state.result &&
                                <div style={{ wordBreak: 'break-word', maxHeight: '400px', overflowY: 'auto' }}>
                                    <pre>{this.state.result}</pre>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
