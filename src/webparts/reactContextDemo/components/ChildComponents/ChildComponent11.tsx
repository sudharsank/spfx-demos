import * as React from 'react';
import { PropertyContext } from '../ReactContextDemo';
import { ChildComponent111 } from './ChildComponent111';

export const ChildComponent11: React.FunctionComponent<{}> = (props) => {
    const ParentPropertyContext: any = React.useContext<any>(PropertyContext);

    return (
        <div style={{ marginLeft: '10px' }}>
            <div>Child Component 11</div>
            <div>{ParentPropertyContext.description}</div>
            <div>
                <ChildComponent111 />
            </div>
        </div>
    );
}