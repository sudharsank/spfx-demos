import * as React from 'react';
import styles from './Demo1.module.scss';
import { IDemo1Props } from './IDemo1Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Demo1 extends React.Component<IDemo1Props, {}> {
  public render(): React.ReactElement<IDemo1Props> {
    return (
      <div className={ styles.demo1 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
