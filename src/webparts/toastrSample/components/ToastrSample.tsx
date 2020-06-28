import * as React from 'react';
import styles from './ToastrSample.module.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IToastrSampleProps } from './IToastrSampleProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as toastr from 'toastr';


export default class ToastrSample extends React.Component<IToastrSampleProps, {}> {

    constructor(props: IToastrSampleProps) {
        super(props);
        SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css');
    }

    public _showToastrMessage = (scope: string) => {
        toastr.options.hideDuration = 5000;
        toastr.options.positionClass = "toast-top-center";
        switch (scope) {
            case "success":
                toastr.success("This is a success message!");
                break;
            case "info":
                toastr.info("This is an info message!");
                break;
            case "warning":
                toastr.warning("This is a warning message!");
                break;
            case "error":
                toastr.error("This is a Error message!");
                break;
        }
    }

    public render(): React.ReactElement<IToastrSampleProps> {
        return (
            <div className={styles.toastrSample}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DefaultButton onClick={() => { this._showToastrMessage('success'); }}>Success</DefaultButton>
                            <DefaultButton onClick={() => { this._showToastrMessage('info'); }}>Info</DefaultButton>
                            <DefaultButton onClick={() => { this._showToastrMessage('warning'); }}>Warning</DefaultButton>
                            <DefaultButton onClick={() => { this._showToastrMessage('error'); }}>Error</DefaultButton>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
