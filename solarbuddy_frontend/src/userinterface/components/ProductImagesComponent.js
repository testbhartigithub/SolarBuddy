import { serverurl } from "../../services/fetchnodeservices";
import { Grid } from "@mui/material";
import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function ProductImagesComponent(props) { 
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const sldr = useRef();
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 4 : 6,
        slidesToScroll: 1,
        arrows: false,
        vertical: !isMobile,
        verticalSwiping: !isMobile,
        autoplay: true,
        autoplaySpeed: 1800
    };

    // Extracting images from props and setting default image
    const images = props.data.picture.split(",");
    const [selectedImage, setSelectedImage] = useState(images[0]);

    // Function to handle when an image is clicked
    const handlePictureChange = (item) => {
        setSelectedImage(item);  // Set clicked image as the main image
    };

    // Function to render image thumbnails
    const showThumbnails = () => {
        return images.map((item, index) => (
            <div key={index} onClick={() => handlePictureChange(item)} style={{ padding: '5px', cursor: 'pointer' }}>
                <img 
                    src={`${serverurl}/images/${item}`} 
                    style={{ 
                        width: '80%', 
                        height: 'auto', 
                        borderRadius: '10%', 
                        border: selectedImage === item ? '2px solid black' : 'none' 
                    }} 
                    alt={`Product Thumbnail ${index}`}
                />
            </div>
        ));
    };

    // Slider navigation controls
    const handleForward = () => sldr.current.slickNext();
    const handleBack = () => sldr.current.slickPrev();

    return (
        <div style={{ width: '100%', marginTop: '5%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2} alignItems="center">
                {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
                <Grid item md={12} style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Thumbnails on the left side on desktop */}
                    {!isMobile && (
                        <Grid item md={1} sm={1} xs={1} style={{ margin: '5%' }}>
                            <div style={{ width: '100%', padding: 5, height: '100%', position: 'relative', marginLeft: '70px' }}>
                                <KeyboardArrowUpIcon 
                                    onClick={handleBack} 
                                    style={{ cursor: 'pointer', color: 'grey', fontSize: '3vw', position: 'absolute', left: '20%', top: "-12%", zIndex: 2 }} 
                                />
                                <Slider ref={sldr} {...settings}>
                                    {showThumbnails()}
                                </Slider>
                                <KeyboardArrowDownIcon 
                                    onClick={handleForward} 
                                    style={{ cursor: 'pointer', color: 'grey', fontSize: '3rem', position: 'absolute', left: '13%', top: "98%", zIndex: 2 }} 
                                />
                            </div>
                        </Grid>
                    )}

                    {/* Main image with center alignment for mobile */}
                    <Grid 
                        item 
                        md={10} 
                        sm={9} 
                        xs={9} 
                        style={{ 
                            marginLeft: '2%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            textAlign: isMobile ? 'center' : 'left'  // Center main image on mobile
                        }}
                    >
                        <img 
                            src={`${serverurl}/images/${selectedImage}`} 
                            style={{ 
                                width: isMobile ? '90%' : '70%', // Smaller width on mobile
                                height: isMobile ? 'auto' : '70%', 
                                background: 'lightgrey', 
                                borderRadius: '10%', 
                                display: 'block',
                                margin: isMobile ? '0 auto' : '0'  // Center the main image horizontally on mobile
                            }} 
                            alt="Main Product"
                        />
                    </Grid>
                </Grid>

                {/* Thumbnails below the main image on mobile */}
                {isMobile && (
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
                        <KeyboardArrowLeftIcon 
                            onClick={handleBack} 
                            style={{ cursor: 'pointer', color: 'grey', fontSize: '2rem', marginRight: '5px' }} 
                        />
                        <div style={{ width: '90%', overflow: 'hidden' }}>
                            <Slider ref={sldr} {...settings}>
                                {showThumbnails()}
                            </Slider>
                        </div>
                        <KeyboardArrowRightIcon 
                            onClick={handleForward} 
                            style={{ cursor: 'pointer', color: 'grey', fontSize: '2rem', marginLeft: '5px' }} 
                        />
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
