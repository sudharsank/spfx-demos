import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

import * as strings from 'Demo3WebPartStrings';
import Demo3 from './components/Demo3';
import { IDemo3Props } from './components/Demo3';

export interface IDemo3WebPartProps {
    jsonData: string;
}

export default class Demo3WebPart extends BaseClientSideWebPart<IDemo3WebPartProps> {

    public render(): void {
        const element: React.ReactElement<IDemo3Props> = React.createElement(
            Demo3,
            {
                jsonData: this.properties.jsonData
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
                                PropertyFieldCodeEditor('jsonData', {
                                    label: 'Edit JSON Data',
                                    panelTitle: 'Edit JSON Data',
                                    initialValue: this.properties.jsonData,
                                    onPropertyChange: this.onPropertyPaneFieldChanged,
                                    properties: this.properties,
                                    disabled: false,
                                    key: 'jsonDataFieldId',
                                    language: PropertyFieldCodeEditorLanguages.JSON
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
