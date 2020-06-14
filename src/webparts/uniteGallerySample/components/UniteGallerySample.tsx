import * as React from 'react';
import styles from './UniteGallerySample.module.scss';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as $ from 'jquery';
require('unitegallery');
require('ug-theme-slider');

export interface IUniteGallerySampleProps {

}

export interface IUniteGallerySampleState {
    divGuid: string;
}

const images: any[] = [
    'https://image.freepik.com/free-vector/bridge-with-full-moon-scenery-landscape_105940-72.jpg',
    'https://image.freepik.com/free-vector/three-geometric-neon-frames-banner-with-text-space_1017-25564.jpg',
    'https://image.freepik.com/free-vector/illustration-space_29937-1093.jpg'
];

export default class UniteGallerySample extends React.Component<IUniteGallerySampleProps, IUniteGallerySampleState> {
    constructor(props: IUniteGallerySampleProps) {
        super(props);
        this.state = {
            divGuid: ''
        };
        SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/unitegallery/1.7.40/css/unite-gallery.min.css');
    }

    public s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    public getGuid = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    public _getImages = (): JSX.Element => {
        return (
            <>
                {images.map((img: any) => {
                    return (
                        <img alt={"Sample"} src={img} data-image={img} />
                    );
                })}
            </>
        );
    }

    public _loadUniteGallery = () => {
        ($ as any)(`#${this.state.divGuid}_divGallery`).unitegallery({});
    }

    public componentDidMount = () => {
        let divGuid: string = this.getGuid();
        this.setState({ divGuid }, () => {
            this._loadUniteGallery();
        });
    }

    public render(): React.ReactElement<IUniteGallerySampleProps> {
        const { divGuid } = this.state;
        return (
            <>
                {divGuid &&
                    <div id={`${divGuid}_divGallery`} style={{ display: '' }}>
                        {this._getImages()}
                    </div>
                }
            </>
        );
    }
}