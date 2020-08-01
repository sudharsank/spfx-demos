import * as React from 'react';
import styles from './MgtComponents.module.scss';
import { IMgtComponentsProps } from './IMgtComponentsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import MGTPerson from '../common/MGTPerson';

export default class MgtComponents extends React.Component<IMgtComponentsProps, {}> {
    public render(): React.ReactElement<IMgtComponentsProps> {
        return (
            <div className={styles.mgtComponents}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <MGTPerson />
                    </div>
                </div>
            </div>
        );
    }
}
