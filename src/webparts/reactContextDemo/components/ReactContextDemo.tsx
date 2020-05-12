import * as React from 'react';
import styles from './ReactContextDemo.module.scss';
import { IReactContextDemoProps } from './IReactContextDemoProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ChildComponent1 } from './ChildComponents/ChildComponent1';

export const PropertyContext: any = React.createContext(undefined);


export const CustomPropertyContext: any = React.createContext(undefined);

export default class ReactContextDemo extends React.Component<IReactContextDemoProps, {}> {
	public render(): React.ReactElement<IReactContextDemoProps> {
		return (
			<div className={styles.reactContextDemo}>
				<div className={styles.container}>
					<div className={styles.row}>
						<div className={styles.column}>
							<div>Main Component</div>
							<div>{this.props.description}</div>
							<PropertyContext.Provider value={this.props}>
								<ChildComponent1 />								
							</PropertyContext.Provider>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
