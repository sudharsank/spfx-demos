import * as React from 'react';
import styles from './Demo3.module.scss';
import * as strings from 'Demo3WebPartStrings';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';

export interface IDemo3Props {
    jsonData: string;
}

export interface IDemo3State {
    items: any;
    columns: IColumn[];
}

export default class Demo3 extends React.Component<IDemo3Props, IDemo3State> {

    constructor(props: IDemo3Props) {
        super(props);
        this.state = {
            items: [],
            columns: []
        };
    }

    public componentDidMount = () => {
        this._buildDataList();
    }

    public componentDidUpdate = (prevProps: IDemo3Props) => {
        if (prevProps.jsonData !== this.props.jsonData) {
            this._buildDataList();
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

    public _buildDataList = () => {
        let parsedJson = JSON.parse(this.props.jsonData);
        let _dynamicColumns: string[] = [];
        Object.keys(parsedJson[0]).map((key) => {
            _dynamicColumns.push(key);
        });
        this.setState({
            columns: this._buildColumns(_dynamicColumns),
            items: parsedJson,
        });
    }

    public render(): React.ReactElement<IDemo3Props> {
        const { items, columns } = this.state;
        return (
            <div className={styles.demo3}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <p>{strings.WebPartTitle}</p>
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
                    </div>
                </div>
            </div>
        );
    }
}
