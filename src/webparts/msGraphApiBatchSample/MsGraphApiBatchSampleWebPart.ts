import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MsGraphApiBatchSampleWebPartStrings';
import MsGraphApiBatchSample from './components/MsGraphApiBatchSample';
import { IMsGraphApiBatchSampleProps } from './components/MsGraphApiBatchSample';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IMsGraphApiBatchSampleWebPartProps {
    graphClient: MSGraphClient;
}

export default class MsGraphApiBatchSampleWebPart extends BaseClientSideWebPart<IMsGraphApiBatchSampleWebPartProps> {
    private client: MSGraphClient = null;

    protected async onInit() {
        await super.onInit();
        this.client = await this.context.msGraphClientFactory.getClient();
    }

    public render(): void {
        const element: React.ReactElement<IMsGraphApiBatchSampleProps> = React.createElement(
            MsGraphApiBatchSample,
            {
                graphClient: this.client
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
