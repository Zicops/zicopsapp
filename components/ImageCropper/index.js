import React, {useEffect, useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {Box, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";


const ImageCropper = ({initial, preview, setPreview, setPreviewPage}) => {

    const [image, setImage] = useState('');
    const [cropper, setCropper] = useState({});

    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(initial)
    }, )

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setPreview(cropper.getCroppedCanvas().toDataURL())
        }
        setPreviewPage(0)
    };

    const CustomButton = styled(Button)(({ theme }) => ({
        borderRadius: '15px',
        padding: '10px 15px',
    }));

    return (
        <>
            <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Box
                    width={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                >
                    <IconButton onClick={() => {
                        setPreviewPage(0)
                    }}>
                        <ArrowBackIcon sx={{ color: "#FFF" }} />
                    </IconButton>
                    <Box ml={2} fontSize={"27px"} fontWeight={600} color={'#FFF'}>
                        Edit
                    </Box>
                </Box>
                <Box mb={5} />
                <Cropper
                    style={{ height: 400, width: "100%" }}
                    // zoomOnWheel={false}
                    initialAspectRatio={1}
                    // preview=".img-preview"
                    src={image}
                    viewMode={1}
                    // minCropBoxHeight={10}
                    // minCropBoxWidth={10}
                    // background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                    guides={true}
                />
                <Box mb={4} />
                <CustomButton
                    onClick={getCropData}
                    variant={"contained"}
                    fullWidth
                >
                    Save
                </CustomButton>
            </Box>
        </>
    );
};

export default ImageCropper;
