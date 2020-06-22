import * as React from 'react';
import styles from './MsGraphApiSample.module.scss';
import { MSGraphClient } from '@microsoft/sp-http';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { graph } from "@pnp/graph";
import "@pnp/graph/users";
import "@pnp/graph/insights";
import "@pnp/graph/batch";
import "@pnp/graph/messages";

export interface IMsGraphApiSampleProps {
    client: MSGraphClient;
}

export interface IMsGraphApiSampleState {
    loading: boolean;
    result: string;
}

export default class MsGraphApiSample extends React.Component<IMsGraphApiSampleProps, IMsGraphApiSampleState> {

    constructor(props: IMsGraphApiSampleProps) {
        super(props);
        this.state = {
            loading: false,
            result: ''
        };
    }

    private _getCurrentUserInfo = async () => {
        this.setState({
            loading: true,
            result: ''
        });
        let userInfo: any = await this.props.client.api('/me').get();
        this.setState({
            loading: false,
            result: JSON.stringify(userInfo, undefined, 2)
        });
    }

    private _getTrendingItems = async () => {
        this.setState({
            loading: true,
            result: ''
        });
        let trendingItems: any = await this.props.client.api('/me/insights/trending').get();
        this.setState({
            loading: false,
            result: JSON.stringify(trendingItems, undefined, 2)
        });
    }

    private _getBatchResponse = async () => {
        this.setState({
            loading: true,
            result: ''
        });
        let batchReqests: any = {
            "requests": [
                {
                    "url": "/me?$select=displayName,jobTitle,userPrincipalName",
                    "method": "GET",
                    "id": "1"
                },
                {
                    "url": "/me/messages?$filter=importance eq 'high'&$select=from,subject",
                    "method": "GET",
                    "id": "2",
                    "DependsOn": [
                        "1"
                    ]
                },
                {
                    "url": "/me/events?$select=subject,organizer",
                    "method": "GET",
                    "id": "3",
                    "DependsOn": [
                        "2"
                    ]
                }
            ]
        };
        let batchResponse: any = await this.props.client.api('$batch').post(batchReqests);
        this.setState({
            loading: false,
            result: JSON.stringify(batchResponse, undefined, 2)
        });
    }

    private _getPnPUserInfo = async () => {
        this.setState({
            loading: true,
            result: ''
        });
        let userInfo: any = await graph.me.get();
        this.setState({
            loading: false,
            result: JSON.stringify(userInfo, undefined, 2)
        });
    }

    private _getPnPTrendingItems = async () => {
        this.setState({
            loading: true,
            result: ''
        });
        let trendingItems: any = await graph.me.insights.trending.get();
        this.setState({
            loading: false,
            result: JSON.stringify(trendingItems, undefined, 2)
        });
    }

    private _getPnPBatchResponse = async () => {
        this.setState({
            loading: true,
            result: ''
        });
        let batch = graph.createBatch();
        let userRes = null;
        let messageRes = null;
        graph.me.select('displayName', 'jobTitle', 'userPrincipalName').inBatch(batch).get().then((o) => {
            userRes = o;
        });
        graph.me.messages.select('from', 'subject').inBatch(batch).get().then((o) => {
            messageRes = o;
        });
        await batch.execute();
        this.setState({
            loading: false,
            result: JSON.stringify(userRes, null, 4) + JSON.stringify(messageRes, null, 4)
        });
    }

    public render(): React.ReactElement<IMsGraphApiSampleProps> {
        return (
            <div className={styles.msGraphApiSample}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div>
                                <div><h3>Using MSGraph Client</h3></div>
                            </div>
                            <DefaultButton onClick={this._getCurrentUserInfo}>Get User Info</DefaultButton>
                            <DefaultButton onClick={this._getTrendingItems}>Get Trending Items</DefaultButton>
                            <DefaultButton onClick={this._getBatchResponse}>Get Batch Response</DefaultButton>
                            <div>
                                <div><h3>Using PnPGraph</h3></div>
                            </div>
                            <DefaultButton onClick={this._getPnPUserInfo}>Get User Info</DefaultButton>
                            <DefaultButton onClick={this._getPnPTrendingItems}>Get Trending Items</DefaultButton>
                            <DefaultButton onClick={this._getPnPBatchResponse}>Get Batch Response</DefaultButton>
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
