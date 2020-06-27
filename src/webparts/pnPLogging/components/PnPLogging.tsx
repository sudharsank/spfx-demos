import * as React from 'react';
import styles from './PnPLogging.module.scss';
import { IPnPLoggingProps } from './IPnPLoggingProps';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import { LogLevel } from '@pnp/logging';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";
import * as util from './common/Util';

export default class PnPLogging extends React.Component<IPnPLoggingProps, {}> {

    constructor(props: IPnPLoggingProps) {
        super(props);
    }

    public _generateError = () => {
        sp.web.lists.getByTitle('Branches').items.select('Title').getAll().then(items => {
            console.log(items);
        }).catch((err: Error) => {
            util.writeErrorLog("PnPLogging.tsx", '_generateError', err.stack, LogLevel.Error, err);
        });
    }

    public _generateAsyncError = async () => {
        try {
            await sp.web.lists.getByTitle('Branches').items.select('Title').getAll();
        } catch (err) {
            util.writeErrorLog("PnPLogging.tsx", '_generateAsyncError', err.stack, LogLevel.Error, err);
        }
    }

    public render(): React.ReactElement<IPnPLoggingProps> {
        return (
            <div className={styles.pnPLogging}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DefaultButton onClick={this._generateError} text="Generate Error" />
                            <DefaultButton onClick={this._generateAsyncError} text="Generate Async Error" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
