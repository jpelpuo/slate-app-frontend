import React, { useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Card, Alert } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { connect } from 'react-redux';
import { takePicture, savePicture } from '../redux/actions/userActions';
import PropTypes from 'prop-types';
import { FaCamera, FaSave } from 'react-icons/fa'


const VideoImageWrapper = styled(Card)`
    width: 100%;
    display: flex;
    min-height: 100vh;
    justify-content: center;
    flex-flow: row nowrap;
    border-box: box-sizing;
    border: none;
    transition: 0.2s all;

    @media screen and (max-width: 900px){
        flex-flow: column nowrap;
    }
`;

const MediaWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    @media screen and (max-width: 1280px){
        flex-flow: column nowrap;
    }
`;

const ActionsWrapper = styled.div`
    margin: 1rem 0;
`;

const WebcamWrapper = styled.div`
    margin: 1rem;
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 400px;
    height: 400px;

    @media screen and (max-width: 900px){
        margin: 1rem auto;
        width: 95%;
    }
`;

const CapturedImageWrapper = styled.div`
    width: 400px;
    height: 400px;
    box-sizing: border-box;
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;

    @media screen and (max-width: 900px){
        margin: 1rem auto;
    }
`;

const VideoFeedCanvas = styled(Webcam)`
    position: relative; 
    right: 0; 
    bottom: 0;
    width: 100%; 
    height: 100%; 
    overflow: hidden;
    background-size: cover;
    object-fit: cover;
`;

const CapturedImage = styled.img`
    position: relative; 
    right: 0; 
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-size: cover;
`;

const SideInfoContainer = styled.div`
    display: flex;
    width: 40%;
    background: rgb(131,58,180);
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,91,29,1) 100%);
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    color: white;
    box-sizing: border-box;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    transition: 0.2s all;

    @media screen and (max-width: 900px){
        width: 100%;
        height: 25%;
        padding: 1rem 1rem;
        border-top-right-radius: 0;
    }
`;

const MainMediaContainer = styled.div`
    display: flex;
    width: 60%;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    transition: 0.2s all;

    @media screen and (max-width: 900px){
        width: 100%;
    }

`;

const HeaderText = styled.span`
    font-weight: 700;
`;

const SubTitleText = styled.div`
    @media screen and (max-width: 540px){
        display: none;
    }
`;

const StyledButton = styled(Button)`
    background: rgb(131,58,180);
    border: none;
    border-radius: 0.9rem;
`;


const PicturePage = ({ image, takePicture, savePicture, userName, imageSaved }) => {
    const webcamRef = useRef();

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot({ width: 200, height: 200 });
        takePicture(imageSrc)
    }, [webcamRef, takePicture]);

    const handleSave = () => {
        const payload = {
            imageBase64: image,
            userName
        }
        savePicture(payload)
    }

    return (
        <VideoImageWrapper className="">
            <SideInfoContainer>
                <h2>
                    <HeaderText>
                        Finish Setting up your account
                    </HeaderText>
                </h2>
                <SubTitleText className="px-5 my-3">
                    We want to be able to recognise you better for exam purposes
                </SubTitleText>
            </SideInfoContainer>
            <MainMediaContainer className="my-auto">
                <h2 className="mb-4">
                    <HeaderText>Add your picture</HeaderText>
                </h2>
                <Card.Subtitle className="text-muted mb-4">
                    {
                        imageSaved
                            ? <Alert variant="success">Image saved... Redirecting to login</Alert>
                            : "Get the best shot and save it"
                    }
                </Card.Subtitle>
                <MediaWrapper>
                    <WebcamWrapper>
                        <VideoFeedCanvas
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            mirrored
                        />
                    </WebcamWrapper>
                    <CapturedImageWrapper>
                        {
                            image ?
                                <CapturedImage src={image} alt="Your picture will appear here" />
                                : <div>Your picture will appear here</div>
                        }
                    </CapturedImageWrapper>
                </MediaWrapper>
                <ActionsWrapper>
                    <StyledButton className="mx-1" onClick={handleCapture}>
                        <FaCamera />
                        <span className="ml-1" style={{ verticalAlign: "middle" }}>
                            Take Picture
                        </span>
                    </StyledButton>
                    <StyledButton
                        className="mx-1"
                        disabled={image === "" ? true : false}
                        onClick={handleSave}
                    >
                        <FaSave />
                        <span className="ml-1" style={{ verticalAlign: "middle" }}>
                            Save Picture
                        </span>
                    </StyledButton>
                </ActionsWrapper>
            </MainMediaContainer>
        </VideoImageWrapper>
    );
}

const select = state => {
    return {
        image: state.user.image,
        userName: state.user.userName,
        imageSaved: state.user.imageSaved
    }
}

PicturePage.propTypes = {
    image: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    imageSaved: PropTypes.bool.isRequired
}

export default connect(select, { takePicture, savePicture })(PicturePage);