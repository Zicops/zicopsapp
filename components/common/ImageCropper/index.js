import React, {useEffect, useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {Box, Dialog, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";


const ImageCropper = ({initialImage, setCroppedImage, aspectRatio}) => {

    const [image, setImage] = useState('');
    const [cropper, setCropper] = useState({});
    const [pop, setPop] = useState(false);
    const handleClick = () => {
        setPop(true);
    };
    const handleClose = () => {
        setPop(false);
    };

    useEffect(() => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result)
        }
        reader.readAsDataURL(initialImage)
    }, )

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCroppedImage(cropper.getCroppedCanvas().toDataURL())
        }
        handleClose()
    };

    const CustomButton = styled(Button)(({ theme }) => ({
        borderRadius: '15px',
        padding: '10px 15px',
    }));

    return (
        <>
            <IconButton onClick={handleClick}>
                <EditIcon sx={{ color: "#FFF" }} />
            </IconButton>
            <Dialog
                open={pop}
                onClose={handleClose}
            >
                <Box
                    py={3}
                    px={3}
                    zIndex={1}
                    width={"450px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
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
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            px={2}
                        >
                            <Box fontSize={"27px"} fontWeight={600} color={'#FFF'}>
                                Edit Image
                            </Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ color: "#FFF" }} />
                            </IconButton>
                        </Box>
                        <Box mb={5} />
                        <Cropper
                            style={{ height: 400, width: "100%" }}
                            zoomOnWheel={false}
                            aspectRatio={aspectRatio} //aspectRatio values format 1/1, 19/9, 4/3, etc.
                            src={image}
                            viewMode={1}
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
                </Box>
            </Dialog>
        </>
    );
};

export default ImageCropper;
