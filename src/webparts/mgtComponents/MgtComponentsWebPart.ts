import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MgtComponentsWebPartStrings';
import MgtComponents from './components/MgtComponents';
import { IMgtComponentsProps } from './components/IMgtComponentsProps';
import { Providers, SharePointProvider } from '@microsoft/mgt';

export interface IMgtComponentsWebPartProps {
    description: string;
}

export default class MgtComponentsWebPart extends BaseClientSideWebPart<IMgtComponentsWebPartProps> {
    protected onInit(): Promise<void> {
        // this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
        // this.theme = this.themeProvider.tryGetTheme();
        // this.themeProvider.themeChangedEvent.add(this, this.onThemeChanged);
        Providers.globalProvider = new SharePointProvider(this.context);
        return super.onInit();
    }
    public render(): void {
        const element: React.ReactElement<IMgtComponentsProps> = React.createElement(
            MgtComponents,
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
