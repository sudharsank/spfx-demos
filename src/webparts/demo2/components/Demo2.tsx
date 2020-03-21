import * as React from 'react';
import styles from './Demo2.module.scss';
import { IDemo2Props } from './IDemo2Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { FileTypeIcon, ApplicationType, IconType, ImageSize } from "@pnp/spfx-controls-react/lib/FileTypeIcon";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Text } from 'office-ui-fabric-react/lib/Text';

import { sp } from "@pnp/sp";
import { IItem, IItemAddResult } from "@pnp/sp/items";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import { IList } from '@pnp/sp/lists';

export interface IDemo2State {
  filePicked: IFilePickerResult;
  message: string;
}

export default class Demo2 extends React.Component<IDemo2Props, IDemo2State> {

  public constructor(props: IDemo2Props) {
    super(props);
    this.state = {
      filePicked: null,
      message: ''
    };
  }

  private getSelectedFile = async (filePickerResult: IFilePickerResult) => {
    this.setState({
      filePicked: filePickerResult,
      message: ''
    });
  }

  private addAttachmentToList = async () => {
    const { filePicked } = this.state;
    if (filePicked) {
      let targetList: IList = await sp.web.lists.getByTitle('Demo');
      let addedItem: IItemAddResult = await targetList.items.add({
        Title: new Date().toString()
      });
      let selectedFile = await filePicked.downloadFileContent();
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = async () => {
        await targetList.items.getById(addedItem.data.Id).attachmentFiles
          .add(filePicked.fileName, reader.result);
        this.setState({ message: 'Attachment Successfully added' });
      };
    }
  }

  public render(): React.ReactElement<IDemo2Props> {
    return (
      <div className={styles.demo2}>
        <div className={styles.container}>
          <div className={styles.row}>
            <span className={styles.title}>Welcome to FilePicker and FileTypeIcon demo!</span>            
            <FilePicker
              buttonLabel="Select file"
              buttonIcon="FileImage"
              bingAPIKey=""
              //accepts={[".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"]}
              onSave={this.getSelectedFile}
              onChanged={this.getSelectedFile}
              context={this.props.context}
              required={true}
              hideRecentTab={false}
              hideWebSearchTab={false}
              hideOrganisationalAssetTab={false}
              hideOneDriveTab={false}
              hideSiteFilesTab={false}
              hideLocalUploadTab={false}
              hideLinkUploadTab={false}
            />
            {this.state.filePicked &&
              <div className={styles.fileContainer}>
                <FileTypeIcon path={this.state.filePicked.fileAbsoluteUrl ? this.state.filePicked.fileAbsoluteUrl : this.state.filePicked.fileName} type={IconType.font} />
                &nbsp;{this.state.filePicked.fileName}
                <div style={{ marginTop: '10px' }}>
                  <PrimaryButton text="Save Attachment" onClick={this.addAttachmentToList} />
                </div>
                {this.state.message &&
                  <div style={{ marginTop: '10px' }}>
                    <Text block variant={"medium"}>{this.state.message}</Text>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
