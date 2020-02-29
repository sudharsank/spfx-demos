import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'Demo2WebPartStrings';
import Demo2 from './components/Demo2';
import { IDemo2Props } from './components/IDemo2Props';

import { sp } from "@pnp/sp";


export interface IDemo2WebPartProps {
  description: string;
}

export default class Demo2WebPart extends BaseClientSideWebPart<IDemo2WebPartProps> {

  public onInit(): Promise<void> {
    sp.setup(this.context);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IDemo2Props> = React.createElement(
      Demo2,
      {
        description: this.properties.description,
        context: this.context
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
