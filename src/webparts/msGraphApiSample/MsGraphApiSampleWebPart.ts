import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MsGraphApiSampleWebPartStrings';
import MsGraphApiSample from './components/MsGraphApiSample';
import { IMsGraphApiSampleProps } from './components/MsGraphApiSample';

import { graph } from "@pnp/graph";
import { MSGraphClient } from '@microsoft/sp-http';

export interface IMsGraphApiSampleWebPartProps {
    client: MSGraphClient
}

export default class MsGraphApiSampleWebPart extends BaseClientSideWebPart<IMsGraphApiSampleWebPartProps> {

    protected onInit(): Promise<void> {
        return super.onInit().then(_ => {
            graph.setup({
                spfxContext: this.context
            });
        });
    }

    public async render(): Promise<void> {
        const element: React.ReactElement<IMsGraphApiSampleProps> = React.createElement(
            MsGraphApiSample,
            {
                client: await this.context.msGraphClientFactory.getClient()
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
