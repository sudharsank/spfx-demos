import * as React from 'react';
import styles from './PivotSample.module.scss';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

const CustomStylePivot: React.FunctionComponent<{}> = (props) => {

    return (
        <div>
            <Pivot className={styles.pivotControl}>
                <PivotItem headerText="Tab 1">
                    <div className={styles.pivotContent}>{"Pivot 1 content"}</div>
                </PivotItem>
                <PivotItem headerText="Tab 2">
                    <div className={styles.pivotContent}>{"Pivot 2 content"}</div>
                </PivotItem>
                <PivotItem headerText="Tab 3">
                    <div className={styles.pivotContent}>{"Pivot 3 content"}</div>
                </PivotItem>
            </Pivot>
        </div>
    );
};

export default CustomStylePivot;