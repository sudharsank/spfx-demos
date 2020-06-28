import * as React from 'react';
import { PropertyContext, CustomPropertyContext } from '../ReactContextDemo';
import { Child1Property } from './ChildComponent1';

export const ChildComponent111: React.FunctionComponent<{}> = (props) => {
    const ParentPropertyContext: any = React.useContext<any>(PropertyContext);
    const CustomChild1Props: any = React.useContext<any>(Child1Property);

    return (
        <div style={{ marginLeft: '10px' }}>
            <div>Child Component 111</div>
            <div>{ParentPropertyContext.description}</div>
            <div style={{ marginLeft: '10px' }}>
                <div>Child Component 1 Properties</div>
                <div>{CustomChild1Props.prop1}</div>
                <div>{CustomChild1Props.prop2}</div>
            </div>
        </div>
    );
};