import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'HelloMgtWebPartStrings';
import HelloMgt from './components/HelloMgt';
import { IHelloMgtProps } from './components/IHelloMgtProps';
import { ThemeProvider, IReadonlyTheme, ThemeChangedEventArgs } from '@microsoft/sp-component-base';
import { Providers, SharePointProvider } from '@microsoft/mgt';

export interface IHelloMgtWebPartProps {
    description: string;
}

export default class HelloMgtWebPart extends BaseClientSideWebPart<IHelloMgtWebPartProps> {
    private themeProvider: ThemeProvider;
    private theme: IReadonlyTheme;

    protected onInit(): Promise<void> {
        this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
        this.theme = this.themeProvider.tryGetTheme();
        this.themeProvider.themeChangedEvent.add(this, this.onThemeChanged);
        Providers.globalProvider = new SharePointProvider(this.context);
        return super.onInit();
    }

    private onThemeChanged(args: ThemeChangedEventArgs) {
        this.theme = args.theme;
        this.render();
    }
    
    public render(): void {
        const element: React.ReactElement<IHelloMgtProps> = React.createElement(
            HelloMgt,
            {
                description: this.properties.description,
                themeVariant: this.theme
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
