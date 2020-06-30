import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPCachingWebPartStrings';
import PnPCaching from './components/PnPCaching';
import { IPnPCachingProps } from './components/IPnPCachingProps';

import { sp } from '@pnp/sp';

export interface IPnPCachingWebPartProps {
    description: string;
}

export default class PnPCachingWebPart extends BaseClientSideWebPart<IPnPCachingWebPartProps> {

    public onInit(): Promise<void> {        
        return super.onInit().then(_ => {
            sp.setup({
                spfxContext: this.context,
                defaultCachingStore: "local", //"session"
                defaultCachingTimeoutSeconds: 30,
                globalCacheDisable: false // or true to disable caching in case of debugging/testing
            });
        });
    }

    public render(): void {
        const element: React.ReactElement<IPnPCachingProps> = React.createElement(
            PnPCaching,
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
