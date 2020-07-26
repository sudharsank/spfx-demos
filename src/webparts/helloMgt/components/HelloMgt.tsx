import * as React from 'react';
import styles from './HelloMgt.module.scss';
import { IHelloMgtProps } from './IHelloMgtProps';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mgt-person': any;
        }
    }
}

export default class HelloMgt extends React.Component<IHelloMgtProps, {}> {
    private personDetail: any = {
        displayName: 'Pradeep Gupta',
        mail: 'This is a random text'
    };
    private personStyle = mergeStyleSets({
        themeStyle: {
            backgroundColor: this.props.themeVariant.palette.themePrimary
        }
    });

    public render(): React.ReactElement<IHelloMgtProps> {
        return (
            <div className={styles.helloMgt}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className={styles.divRow}>
                                <mgt-person class={styles.personStyle} person-query="me"
                                    show-name show-email></mgt-person>
                            </div>
                            <div className={styles.divRow}>
                                <mgt-person class={this.personStyle.themeStyle} person-details={JSON.stringify(this.personDetail)} view="twolines"></mgt-person>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
