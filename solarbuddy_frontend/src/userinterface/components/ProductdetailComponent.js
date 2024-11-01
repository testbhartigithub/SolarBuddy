import React, { useState } from "react";
import { Grid, Divider, Typography, Button, Tab, Tabs, Modal, TextField, Rating } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DetailPlusMinus from "./DetailPlusMinus";
import Swal from "sweetalert2";
import { postData } from "../../services/fetchnodeservices";

export default function ProductDetailComponent(props) {
    const location = useLocation();
    const dispatch = useDispatch();
    const items = location.state?.product;

    const [value, setValue] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [newReview, setNewReview] = useState({ username: '', comment: '', rating: '' });
    const [reviews, setReviews] = useState(items?.reviews || []);
    const [rating, setRating] = useState(items?.rating || 0);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const theme = useTheme();
    const matches2 = useMediaQuery(theme.breakpoints.down(450));

    const productFromRedux = useSelector(state => state.Cart);
    const cartQty = productFromRedux[items?.productdetailid]?.qty || 0;

    const handlePlusMinus = (v) => {
        if (v >= 1) {
            const item = { ...items, qty: v };
            dispatch({ type: 'ADD_CART', payload: [item.productdetailid, item] });
        } else {
            dispatch({ type: 'DELETE_CART', payload: [items.productdetailid] });
        }
        props.setPageRefresh(!props.pageRefresh);
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const submitReview = async () => {
        try {
            const response = await postData('userinterface/reviews', {
                productdetailid: items?.productdetailid,
                username: newReview.username,
                comment: newReview.comment,
                rating: newReview.rating,
            });

            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Review Submitted',
                    text: response.message,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Submit Review',
                    text: response.message || 'An error occurred while submitting the review',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong while submitting your review',
            });
        }
    };

    const renderStars = (rating) => (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            {[...Array(5)].map((_, index) => (
                <StarIcon key={index} style={{ color: index < rating ? '#FFD700' : '#ddd', fontSize: '1rem' }} />
            ))}
            <span style={{ marginLeft: '5px', fontSize: '0.8rem', color: '#666' }}>
                {reviews.length || 0} Review{reviews.length !== 1 ? 's' : ''}
            </span>
        </div>
    );

    const renderDescription = () => {
        const descriptionText = items?.description || "";

        return (
            <div style={{ fontSize: '0.9rem', color: '#333', lineHeight: '1.5', marginTop: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', fontFamily:'poppins' }}>
                    Description :
                </Typography>
                <div
                    style={{
                        maxHeight: showFullDescription ? 'none' : '6em', // Approx. four lines
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                    dangerouslySetInnerHTML={{ __html: descriptionText }}
                />
                <Button
                    size="small"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    style={{ marginTop: '0.5rem', padding: '0', fontSize: '0.8rem', textTransform: 'none', color: 'black' }}
                >
                    {showFullDescription ? "Read less..." : "Read more..."}
                </Button>
            </div>
        );
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffff', padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <Tabs value={value} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                        <Tab label="Product Details" />
                        <Tab label="Reviews" onClick={handleOpenModal} />
                    </Tabs>
                    <Divider style={{ margin: '1rem 0' }} />

                    {value === 0 && (
                        <>
                            <Typography variant="h5" style={{ fontWeight: 'bolder', marginBottom: '1rem', fontFamily: 'poppins' }}>
                                {items?.productname} ({items?.productsubname})
                            </Typography>

                            <Divider style={{ margin: '1rem 0' }} />

                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', margin: '1rem 0' }}>
                                <span style={{ fontSize: '1.3rem' }}>M.R.P:</span>
                                <CurrencyRupeeIcon style={{ fontSize: '1.3rem', marginLeft: '5px' }} />
                                <span style={{ marginLeft: '2px', fontWeight: 'bold', fontSize: '1.5rem' }}>{items?.offerprice}</span>
                                <span style={{ marginLeft: '5px', color: 'red', textDecoration: 'line-through' }}>{items?.price}</span>
                            </div>

                            {renderStars(rating)}

                            <div style={{ width: '100%', marginTop: '5%' }}>
                                <DetailPlusMinus
                                    view=''
                                    qty={cartQty}
                                    onChange={(v) => handlePlusMinus(v)}
                                />
                            </div>

                            {/* Product description with 'Read more' functionality */}
                            {renderDescription()}
                        </>
                    )}

                    <Modal open={openModal} onClose={handleCloseModal}>
                        <div style={{ padding: '20px', backgroundColor: 'white', width: '400px', margin: '50px auto' }}>
                            <Typography variant="h6">Submit Your Review</Typography>
                            <TextField
                                label="Username"
                                fullWidth
                                value={newReview.username}
                                onChange={(e) => setNewReview({ ...newReview, username: e.target.value })}
                                style={{ marginBottom: '10px' }}
                            />
                            <TextField
                                label="Comment"
                                fullWidth
                                multiline
                                rows={4}
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                style={{ marginBottom: '10px' }}
                            />
                            <Rating
                                name="rating"
                                value={newReview.rating}
                                onChange={(event, newValue) => setNewReview({ ...newReview, rating: newValue })}
                                style={{ marginBottom: '10px' }}
                            />
                            <Button variant="contained" color="primary" onClick={submitReview}>
                                Submit
                            </Button>
                        </div>
                    </Modal>

                    {value === 1 && (
                        <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#fff' }}>
                            <Typography variant="h6">Customer Reviews</Typography>
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} style={{ margin: '1rem 0' }}>
                                        <Typography variant="body1"><strong>{review.username}:</strong> {review.comment}</Typography>
                                        <Typography variant="body2" style={{ color: '#999' }}>
                                            {new Date(review.date).toLocaleDateString()}
                                        </Typography>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body2" style={{ color: '#999' }}>No reviews available.</Typography>
                            )}
                        </div>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
