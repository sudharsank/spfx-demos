import * as React from 'react';
import { useState } from 'react';
import styles from './MsGraphApiBatchSample.module.scss';
import { MSGraphClient } from '@microsoft/sp-http';
import { chunk, flatten } from '@microsoft/sp-lodash-subset';

export interface IMsGraphApiBatchSampleProps {
    graphClient: MSGraphClient;
}

const batchItemLimit: number = 18;
const userBatchLimit: number = 6;
const sampleUsers = [
    'AdeleV@o365practice.onmicrosoft.com',
    'AlexW@o365practice.onmicrosoft.com',
    'DiegoS@o365practice.onmicrosoft.com',
    'IsaiahL@o365practice.onmicrosoft.com',
    'LeeG@o365practice.onmicrosoft.com'
];

const MsGraphApiBatchSample: React.FC<IMsGraphApiBatchSampleProps> = (props) => {
    const [userPhotos, setUserPhotos] = useState<any[]>([]);

    const getUserThumbnailPhotos = async (): Promise<any[]> => {
        let finalResponse: any[] = [];
        return new Promise(async (res, rej) => {
            if (sampleUsers && sampleUsers.length > 0) {
                let requests: any[] = [];
                if (sampleUsers.length > userBatchLimit) {
                    let chunkUserArr: any[] = chunk(sampleUsers, userBatchLimit);
                    Promise.all(chunkUserArr.map(async chnkdata => {
                        requests = [];
                        chnkdata.map((user: any) => {
                            requests.push({
                                id: `${user}_1`,
                                method: 'GET',
                                responseType: 'blob',
                                headers: { "Content-Type": "image/jpeg" },
                                url: `/users/${user}/photos/48x48/$value`
                            }, {
                                id: `${user}_2`,
                                method: 'GET',
                                responseType: 'blob',
                                headers: { "Content-Type": "image/jpeg" },
                                url: `/users/${user}/photos/96x96/$value`
                            }, {
                                id: `${user}_3`,
                                method: 'GET',
                                responseType: 'blob',
                                headers: { "Content-Type": "image/jpeg" },
                                url: `/users/${user}/photos/240x240/$value`
                            });
                        });
                        let photoReq: any = { requests: requests };
                        let graphRes: any = await props.graphClient.api('$batch').post(photoReq);
                        finalResponse.push(graphRes);
                    })).then(() => {
                        res(finalResponse);
                    });
                } else {
                    sampleUsers.map((user: any) => {
                        requests.push({
                            id: `${user}_1`,
                            method: 'GET',
                            responseType: 'blob',
                            headers: { "Content-Type": "image/jpeg" },
                            url: `/users/${user}/photos/48x48/$value`
                        }, {
                            id: `${user}_2`,
                            method: 'GET',
                            responseType: 'blob',
                            headers: { "Content-Type": "image/jpeg" },
                            url: `/users/${user}/photos/96x96/$value`
                        }, {
                            id: `${user}_3`,
                            method: 'GET',
                            responseType: 'blob',
                            headers: { "Content-Type": "image/jpeg" },
                            url: `/users/${user}/photos/240x240/$value`
                        });
                    });
                    let photoReq: any = { requests: requests };
                    finalResponse.push(await props.graphClient.api('$batch').post(photoReq));
                    res(finalResponse);
                }
            }
        });
    };

    const getIndividualPhotos = async () => {
        let finalResponse: any[] = [];
        Promise.all(sampleUsers.map(async user => {
            try {
                let response = await props.graphClient.api(`/users/${user}/photos/240x240/$value`).responseType('blob').get();
                finalResponse.push(response);
            } catch (error) {
                console.log(error);
            }
        })).then(() => {
            console.log(finalResponse);
        });
    }

    const dataURItoBlob = (dataURI): Blob => {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    };

    const runBatch = async () => {
        let userPhotos = [];
        let finalResponse = await getUserThumbnailPhotos();
        finalResponse.map(res => {
            userPhotos.push(res.responses);
        });
        setUserPhotos(userPhotos);
        //getIndividualPhotos();
    };

    React.useEffect(() => {

    }, [userPhotos]);

    return (
        <div className={styles.msGraphApiBatchSample}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <button onClick={runBatch} value="Run Batch">Run Batch</button>
                        <div>
                            {userPhotos.length > 0 &&
                                userPhotos.map(userPhoto => {
                                    return (
                                        userPhoto.map(up => {
                                            if (!up.body.error) {
                                                return (
                                                    <img src={URL.createObjectURL(dataURItoBlob("data:image/jpg;base64," + up.body))} />
                                                );
                                            }
                                        })
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MsGraphApiBatchSample;
