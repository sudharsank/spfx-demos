import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	IPropertyPaneConfiguration,
	PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';

import * as strings from 'Demo4WebPartStrings';
import Demo4 from './components/Demo4';
import { IDemo4Props } from './components/Demo4';

export interface IDemo4WebPartProps {
	CSVData: string;
}

export default class Demo4WebPart extends BaseClientSideWebPart<IDemo4WebPartProps> {

	public render(): void {
		const element: React.ReactElement<IDemo4Props> = React.createElement(
			Demo4,
			{
				CSVData: this.properties.CSVData
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
								PropertyFieldCodeEditor('CSVData', {
									label: 'Edit CSV Data',
									panelTitle: 'Edit CSV Data',
									initialValue: this.properties.CSVData,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									disabled: false,
									key: 'csvDataFieldId',
									language: PropertyFieldCodeEditorLanguages["Plain Text"]
								})
							]
						}
					]
				}
			]
		};
	}
}
