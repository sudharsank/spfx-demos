import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'LocalStorageWebPartStrings';
import LocalStorage from './components/LocalStorage';
import { ILocalStorageProps } from './components/LocalStorage';

import { sp } from "@pnp/sp";


export interface ILocalStorageWebPartProps {
    description: string;
}

export default class LocalStorageWebPart extends BaseClientSideWebPart<ILocalStorageWebPartProps> {

    public onInit(): Promise<void> {
        return super.onInit().then(_ => {
            sp.setup(this.context);
        });
    }

    public render(): void {
        const element: React.ReactElement<ILocalStorageProps> = React.createElement(
            LocalStorage,
            {
                description: this.properties.description
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
