/* eslint-disable constructor-super */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */

import React, {useState} from 'react';
import {Button, Header, Input, Label, RouteWrapper} from "./Route.style";
import {CreateMap} from "../../components";
import RouteToRdfParser from "../../utils/parser/RouteToRdfParser"
import Route from "../../utils/route/Route"
import {errorToaster, successToaster} from '@utils';
import {useTranslation} from "react-i18next";
import MediaLoader from "../../utils/InOut/MediaLoader";
import InputFiles from 'react-input-files';

type Props = {
    webId: String,
    t: Function
};

const CreateRoute = ({webId}: Props) => {
    const {t} = useTranslation();
    const webID = webId.replace("profile/card#me", "");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null);
    const [markers, setMarkers] = useState({});
    const [photoURL, setPhotoURL] = useState("");
    const [videoURL, setVideoURL] = useState("");

    function callbackFunction(childData) {
        setMarkers(childData);
    }

    function handleSave(event) {
        if (title.length === 0) {
            errorToaster(t('notifications.title'), t('notifications.error'));
        } else if (description.length === 0) {
            errorToaster(t('notifications.description'), t('notifications.error'));
        } else {
            let loader = new MediaLoader();
            loader.saveImage(photoURL, photo);
            loader.saveVideo(videoURL, video);
            let route = new Route(title, description, markers, webID, null, photoURL===""?null:photoURL, videoURL===""?null:videoURL);
            let parser = new RouteToRdfParser(route, webID);
            parser.parse();
            successToaster(t('notifications.save'), t('notifications.success'));
            setTimeout(function () {
                window.location.href = '#/timeline'
            }, 1000)
        }
        event.preventDefault();
    }

    function handleTitleChange(event) {
        event.preventDefault();
        setTitle(event.target.value);
    }

    function handleDescriptionChange(event) {
        event.preventDefault();
        setDescription(event.target.value);
    }

    function handlePhotoChange(files) {
        if (files.length > 0) {
            setPhoto(files[0]);
            setPhotoURL(webID + "viade/resources/" + files[0].name);
        }
    }

    function handleVideoChange(files) {
        if (files.length > 0) {
            setVideo(files[0]);
            setVideoURL(webID + "viade/resources/" + files[0].name);
        }
    }

    return (
        <RouteWrapper>
            <Header>
                <h1 className={"text--white"}>{t('createRoute.newRoute')}</h1>
                <Label>{t('createRoute.title')}</Label>
                <Input type="text" size="20" placeholder={t('createRoute.newRoute')} onChange={handleTitleChange} data-testid="input-title" />
                <Label>{t('createRoute.description')}</Label>
                <Input type="text" size="100" placeholder={t('createRoute.description')} onChange={handleDescriptionChange} data-testid="input-description"/>
                <Label>{t('createRoute.media')}</Label>
                <InputFiles onChange={handlePhotoChange} accept={".png"} data-testid="input-img">
                    <button>{t('createRoute.addPhoto')}</button>
                </InputFiles>
                <br/>
                <InputFiles onChange={handleVideoChange} accept={".mp4"} data-testid="input-video">
                    <button>{t('createRoute.addVideo')}</button>
                </InputFiles>
                <br/>
                <Button onClick={handleSave} data-testid="button-save"> {t('createRoute.saveRoute')} </Button>
            </Header>
            <CreateMap parentCallback={callbackFunction}/>
        </RouteWrapper>
    );

};

export default CreateRoute;