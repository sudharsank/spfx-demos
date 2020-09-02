import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './MultiUpload.module.scss';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import ImageResize from 'image-resize';

export interface IMultiUploadProps {

}

const imgResize_48 = new ImageResize({ format: 'png', width: 48, height: 48, output: 'base64' });
const imgResize_96 = new ImageResize({ format: 'png', width: 96, height: 96, output: 'base64' });
const imgResize_240 = new ImageResize({ format: 'png', width: 240, height: 240, output: 'base64' });

const MultiUpload: React.FC<IMultiUploadProps> = (props) => {

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            console.log(acceptedFiles);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    const thumbs = files.map(file => (
        <div className={styles.thumb} key={file.name}>
            <div className={styles.thumbInner}>
                <img src={file.preview} />
            </div>
        </div>
    ));
    const _generateThumbnails = async () => {
        console.log(files);
        //let imgRes = await imageResize.play(files[0].preview);
        //console.log(imgRes);
    }
    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    return (
        <div className={styles.multiUpload}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <section className={styles.dropZoneContainer}>
                        <div {...getRootProps({ className: styles.dropzone })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside className={styles.thumbsContainer}>
                            {thumbs}
                        </aside>
                    </section>
                </div>
                <div className={styles.row}>
                    <PrimaryButton onClick={_generateThumbnails}>Generate Thumbnail</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default MultiUpload;