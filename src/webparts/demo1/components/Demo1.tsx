import * as React from 'react';
import styles from './Demo1.module.scss';
import { IDemo1Props } from './IDemo1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import * as moment from 'moment';

export interface IDemo1State {
  dateCollections: IDateModel[];
}

export interface IDateModel {
  ID: string;
  StartDate: Date;
  EndDate: Date;
}

export default class Demo1 extends React.Component<IDemo1Props, IDemo1State> {

  constructor(props: IDemo1Props) {
    super(props);
    this.state = {
      dateCollections: []
    }
  }

  public componentDidMount = () => {
    this.getDataCollections();
  }

  public componentDidUpdate = (prevProps: IDemo1Props) => {
    if (prevProps.collectionData !== this.props.collectionData) {
      console.log(this.props.collectionData);
      this.getDataCollections();
    }
  }

  private getDataCollections = () => {
    let dataCollections: IDateModel[] = [];
    if (this.props.collectionData) {
      this.props.collectionData.map(data => {
        dataCollections.push({
          ID: data.uniqueId,
          StartDate: data.QStartDate,
          EndDate: data.QEndDate
        });
      });
      this.setState({ dateCollections: dataCollections });
    }
  }

  public render(): JSX.Element {
    return (
      <div className={styles.demo1}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to PropertyFieldCollectionData with DateTime Picker!</span>
              <p className={styles.description}>Collection Data</p>
              <div>
                {this.state.dateCollections && this.state.dateCollections.map(data => {
                  return (
                    <div style={{ paddingBottom: '10px', borderBottom: '1px solid #CCC' }}>
                      <div>{`Unique Id: ${data.ID}`}</div>
                      <div>{`Start Date: ${moment(data.StartDate).format("MM/DD/YYYY")}`}</div>
                      <div>{`End Date: ${moment(data.EndDate).format("MM/DD/YYYY")}`}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
