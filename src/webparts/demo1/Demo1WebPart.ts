import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/DateTimePicker';

import * as strings from 'Demo1WebPartStrings';
import Demo1 from './components/Demo1';
import { IDemo1Props } from './components/IDemo1Props';

export interface IDemo1WebPartProps {
  description: string;
  collectionData: any[];
}

export default class Demo1WebPart extends BaseClientSideWebPart<IDemo1WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDemo1Props> = React.createElement(
      Demo1,
      {
        description: this.properties.description,
        collectionData: this.properties.collectionData
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionDataFieldId",
                  label: 'Sample Collections',
                  panelHeader: 'Date Collections',
                  manageBtnLabel: 'Manage Collections',
                  enableSorting: true,
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "QStartDate",
                      title: 'Start Date',
                      type: CustomCollectionFieldType.custom,
                      required: false,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement(DateTimePicker, {
                            key: itemId,
                            showLabels: false,
                            dateConvention: DateConvention.Date,
                            showGoToToday: true,
                            showMonthPickerAsOverlay: true,
                            value: value ? new Date(value) : null,
                            onChange: (date: Date) => {
                              onUpdate(field.id, date);
                            }
                          })
                        );
                      }
                    },
                    {
                      id: "QEndDate",
                      title: 'End Date',
                      type: CustomCollectionFieldType.custom,
                      required: false,
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement(DateTimePicker, {
                            key: itemId,
                            showLabels: false,
                            dateConvention: DateConvention.Date,
                            showGoToToday: true,
                            showMonthPickerAsOverlay: true,
                            value: value ? new Date(value) : null,
                            onChange: (date: Date) => {
                              onUpdate(field.id, date);
                            }
                          })
                        );
                      }
                    }
                  ],
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
