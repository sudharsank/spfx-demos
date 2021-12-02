import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {sp} from '@pnp/sp/presets/all';
import * as strings from 'LargeListItemsWebPartStrings';
import LargeListItems from './components/LargeListItems';
import { ILargeListItemsProps } from './components/LargeListItems';

export interface ILargeListItemsWebPartProps {
    description: string;
}

export default class LargeListItemsWebPart extends BaseClientSideWebPart<ILargeListItemsWebPartProps> {

    public onInit(): Promise<void> {
        return super.onInit().then(_ => {
            sp.setup(this.context);
        });
    }

    public render(): void {
        const element: React.ReactElement<ILargeListItemsProps> = React.createElement(
            LargeListItems,
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
