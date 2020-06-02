import * as React from 'react';
import styles from './PivotSample.module.scss';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

export interface IPivotWithClickProps {
    selectedKey: string;
    OnMenuClick: (item: PivotItem) => void;
}

export interface IPivotItem {
    text: string;
    key: string;
}

const ISampleItems: IPivotItem[] = [
    { text: 'Dynamic Item 1', key: '0' },
    { text: 'Dynamic Item 2', key: '1' },
    { text: 'Dynamic Item 3', key: '2' },
    { text: 'Dynamic Item 4', key: '3' }
];

const PivotWithClick: React.FunctionComponent<IPivotWithClickProps> = (props) => {

    return (
        <div>
            <Pivot selectedKey={props.selectedKey} onLinkClick={props.OnMenuClick}>
                {ISampleItems.map((item: IPivotItem) => {
                    return (
                        <PivotItem headerText={item.text} itemKey={item.key}>
                            <div className={styles.pivotContent}>{`This is the ${item.text} with key: ${item.key}`}</div>
                        </PivotItem>
                    );
                })}
            </Pivot>
        </div>
    );
};

export default PivotWithClick;