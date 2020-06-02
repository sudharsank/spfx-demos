import * as React from 'react';
import styles from './PivotSample.module.scss';
import { IPivotSampleProps } from './IPivotSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import SimplePivot from './SimplePivot';
import DynamicPivot from './DynamicPivot';
import PivotWithClick from './PivotWithClick';
import CustomStylePivot from './PivotWithCustomStyle';

const PivotSample: React.FunctionComponent<IPivotSampleProps> = (props) => {
	const [selKey, setSelKey] = React.useState<string>('');
	const [selText, setSelText] = React.useState<string>('');
	const handlePivotItemClick = (item: PivotItem) => {
		setSelKey(item.props.itemKey);
		setSelText(item.props.headerText);
	};

	return (
		<div className={styles.pivotSample}>
			<h3>Simple Pivot</h3>
			<hr />
			<SimplePivot />
			<h3>Dynamic Pivot</h3>
			<hr />
			<DynamicPivot />
			<h3>Pivot With Click</h3>
			<hr />
			<PivotWithClick selectedKey={selKey} OnMenuClick={handlePivotItemClick} />
			{selKey && selText &&
				<div className={styles.pivotContent}>
					{`Selected pivot item text: ${selText} and key: ${selKey}`}
				</div>
			}
			<h3>Pivot With Custom Style</h3>
			<CustomStylePivot />
		</div>
	);
};

export default PivotSample;
