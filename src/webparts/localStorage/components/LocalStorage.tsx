import * as React from 'react';
import styles from './LocalStorage.module.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import { PnPClientStorage, dateAdd } from '@pnp/common';

const pnpStorage = new PnPClientStorage();

export interface ILocalStorageProps {
    description: string;
}

export interface ILocalStorageState {
    userinfo: ISiteUserInfo;
}

export default class LocalStorage extends React.Component<ILocalStorageProps, ILocalStorageState> {

    constructor(props: ILocalStorageProps) {
        super(props);
        this.state = {
            userinfo: null
        };
    }

    public _storeCurrentUserInfo = async () => {
        let currentUserInfo: ISiteUserInfo = pnpStorage.local.get("PnP_UserInfo");
        if (!currentUserInfo) {
            currentUserInfo = await sp.web.currentUser.get();
            pnpStorage.local.put('PnP_UserInfo', currentUserInfo, dateAdd(new Date(), 'hour', 1));
        }
    }

    public _getStoredUserInfo = async () => {
        let currentUserInfo: ISiteUserInfo = pnpStorage.local.get("PnP_UserInfo");
        if (currentUserInfo) this.setState({ userinfo: currentUserInfo });
        else this.setState({ userinfo: null });
    }

    public componentDidMount() {
        pnpStorage.local.deleteExpired();
    }

    public render(): React.ReactElement<ILocalStorageProps> {        
        return (
            <div className={styles.localStorage}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DefaultButton text="Store User Info" onClick={this._storeCurrentUserInfo} />
                            <DefaultButton text="Get User Info from Storage" onClick={this._getStoredUserInfo} />
                            <div style={{ display: 'inline-flex' }}>
                                {this.state.userinfo ? (
                                    <div>
                                        <p>Title: {this.state.userinfo.Title}</p>
                                        <p>EMail: {this.state.userinfo.Email}</p>
                                    </div>
                                ) : (
                                        <div>{"Click the button 'Store User Info' to store the user information!"}</div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
