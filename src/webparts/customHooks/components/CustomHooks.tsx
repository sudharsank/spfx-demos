import * as React from 'react';
import styles from './CustomHooks.module.scss';
import { SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { useLoader } from './loaderHook';
import { useIndicator } from './indicatorHook';

const CustomHooks: React.FunctionComponent<{}> = (props) => {
    return (
        <>
            <div className={styles.customHooks}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        {useLoader("Loader using custom hooks", SpinnerSize.large, 'bottom')}
                        {useIndicator('Please wait...', 'Loading the data')}
                    </div>
                </div>
            </div>            
        </>
    );
};

export default CustomHooks;