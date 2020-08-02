import * as React from 'react';
import styles from './MgtComponents.module.scss';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IMgtComponentsProps } from './IMgtComponentsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import MGTPerson from '../common/MGTPerson';
import MGTPersonCard from '../common/MGTPersonCard';

export default class MgtComponents extends React.Component<IMgtComponentsProps, {}> {
    public render(): React.ReactElement<IMgtComponentsProps> {
        return (
            <div className={styles.mgtComponents}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <Pivot>
                            {/* <PivotItem headerText="Person" key="1">
                                <MGTPerson />
                            </PivotItem> */}
                            <PivotItem headerText="Person Card" key="2">
                                <MGTPersonCard />
                            </PivotItem>
                        </Pivot>
                    </div>
                </div>
            </div>
        );
    }
}
