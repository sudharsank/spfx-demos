import * as React from 'react';
import styles from './Demo4.module.scss';
import * as strings from 'Demo4WebPartStrings';
import { escape } from '@microsoft/sp-lodash-subset';
import { IColumn, DetailsList, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import * as csv from 'csvtojson';

export interface IDemo4Props {
	CSVData: string;
}

export interface IDemo4State {
	items: any;
	columns: IColumn[];
}

export default class Demo4 extends React.Component<IDemo4Props, IDemo4State> {
	constructor(props: IDemo4Props) {
		super(props);
		this.state = {
			items: [],
			columns: []
		};
	}

	public componentDidMount = () => {
		this._buildDataList();
	}

	public componentDidUpdate = (prevProps: IDemo4Props) => {
		if (prevProps.CSVData !== this.props.CSVData) {
			this._buildDataList();
		}
	}

	public _buildDataList = async () => {
		const { CSVData } = this.props;
		if (CSVData) {
			let parsedJson: any = await csv().fromString(CSVData);
			let _dynamicColumns: string[] = [];
			Object.keys(parsedJson[0]).map((key) => {
				_dynamicColumns.push(key);
			});
			this.setState({
				columns: this._buildColumns(_dynamicColumns),
				items: parsedJson,
			});
		}
	}

	private _buildColumns = (columns: string[]): IColumn[] => {
		let cols: IColumn[] = [];
		if (columns && columns.length > 0) {
			columns.map((col: string) => {
				cols.push({ key: col, name: col, fieldName: col } as IColumn);
			});
		}
		return cols;
	}

	public render(): React.ReactElement<IDemo4Props> {
		const { items, columns } = this.state;
		return (
			<div className={styles.demo4}>
				<div className={styles.container}>
					<div className={styles.row}>
						<p className={styles.webpartTitle}>{strings.WebPartTitle}</p>
						{items && items.length > 0 &&
							<DetailsList
								items={items}
								setKey="set"
								columns={columns}
								compact={true}
								layoutMode={DetailsListLayoutMode.justified}
								constrainMode={ConstrainMode.unconstrained}
								isHeaderVisible={true}
								selectionMode={SelectionMode.none}
								enableShimmer={true} />
						}
					</div>
				</div>
			</div>
		);
	}
}
