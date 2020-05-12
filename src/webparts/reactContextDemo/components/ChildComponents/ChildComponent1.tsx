import * as React from 'react';
import { PropertyContext } from '../ReactContextDemo';

import { ChildComponent11 } from './ChildComponent11';

export const Child1Property: any = React.createContext<any>(undefined);

export const ChildComponent1: React.FunctionComponent<{}> = (props) => {
    const ParentPropertyContext: any = React.useContext<any>(PropertyContext);
    

    return (
        <div style={{ marginLeft: '10px' }}>
            <div>Child Component 1</div>
            <div>{ParentPropertyContext.description}</div>
            <div>
                <Child1Property.Provider value={{prop1: 'Value 1', prop2: 'Value 2'}}>
                    <ChildComponent11 />
                </Child1Property.Provider>                
            </div>
        </div>
    );
}