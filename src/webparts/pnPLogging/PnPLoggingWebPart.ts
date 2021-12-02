import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPLoggingWebPartStrings';
import PnPLogging from './components/PnPLogging';
import { IPnPLoggingProps } from './components/IPnPLoggingProps';

import CustomLogger from './components/common/CustomLogger';
import { sp } from "@pnp/sp";
import { Logger, LogLevel, FunctionListener, ILogEntry } from "@pnp/logging";

export interface IPnPLoggingWebPartProps {
    description: string;
}

export default class PnPLoggingWebPart extends BaseClientSideWebPart<IPnPLoggingWebPartProps> {

    public onInit(): Promise<void> {        
        return super.onInit().then(_ => {
            sp.setup(this.context);
            this.customLogging();
        });
    }

    private customLogging(): void {
        try {
            let advanceLogging = undefined;
            let listener = new FunctionListener((entry: ILogEntry) => {
                try {
                    switch (entry.level) {
                        case LogLevel.Verbose:
                            //console.info(entry.message);
                            break;
                        case LogLevel.Info:
                            //console.log(entry.message);
                            break;
                        case LogLevel.Warning:
                            //console.warn(entry.message);
                            break;
                        case LogLevel.Error:
                            advanceLogging = new CustomLogger("Sample Logging", this.context.pageContext.site.absoluteUrl, "Error Log", this.context.pageContext.user.loginName);                            
                            Logger.subscribe(advanceLogging);
                            break;
                    }
                } catch (err) {
                    console.error(`Error executing customLogging FunctionListener - ${err}`);
                }
            });            
            Logger.subscribe(listener);
        } catch (err) {
            console.error(`Error initializing customLogging - ${err}`);
        }
        return;
    }

    public render(): void {
        const element: React.ReactElement<IPnPLoggingProps> = React.createElement(
            PnPLogging,
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
