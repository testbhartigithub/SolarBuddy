import { serverurl } from "../../services/fetchnodeservices";
import { Divider, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import PlusMinusComponent from "./PlusMinusComponent";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Importing wishlist icon
import StarIcon from '@mui/icons-material/Star'; // Importing star icon for reviews

export default function ShowProductComponent(props) {
    const theme = useTheme();
    const matches3 = useMediaQuery(theme.breakpoints.down(550));

    let item = props?.data;
    var dispatch = useDispatch();
    var navigate = useNavigate();
    var productFromRedux = JSON.parse(localStorage.getItem('Cart'));

    const handlePlusMinus = (v, item) => {
        if (v >= 1) {
            item['qty'] = v;
            dispatch({ type: 'ADD_CART', payload: [item.productdetailid, item] });
        } else {
            dispatch({ type: 'DELETE_CART', payload: [item.productdetailid] });
        }

        props.setPageRefesh(!props.pageRefesh);
    };

    const handleNextPage = (item) => {
        navigate('/showproductdetails', { state: { product: item } });
    };

    const handleWishlistToggle = (item) => {
        // Add/remove from wishlist logic goes here
    };

    var save = parseInt(item.price) - parseInt(item.offerprice);

    return (
        <div style={{
            width: matches3 ? '100%' : "180px",
            // height: matches3 ? 'auto' : '400px', // Removed fixed height
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            background: '#ffffff',
            marginTop: '1%',
            marginRight: '.4%',
            position: 'relative', // To position the eclipse effect
            overflow: 'hidden',
            padding: '8px', // Add some padding to maintain spacing
            // Use min-height if needed
            minHeight: '300px', // Optional: Set a minimum height for consistent display
            '&::before': { // Eclipse effect
                content: '""',
                position: 'absolute',
                top: '-20%',
                left: '-20%',
                width: '140%',
                height: '140%',
                borderRadius: '50%',
                zIndex: 0,
            }
        }}>
            <div style={{
                width: '100%',
                height: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
                background: '#f7f7f7',
                position: 'relative', // To position the image
                zIndex: 1 // Ensure the image is on top
            }}>
                <img
                    src={`${serverurl}/images/${item.icon}`}
                    alt={item.productname}
                    style={{
                        width: '85%',
                        height: '85%',
                        objectFit: 'contain',
                    }}
                    onClick={() => handleNextPage(item)}
                />
                <IconButton
                    onClick={() => handleWishlistToggle(item)}
                    style={{
                        position: 'absolute',
                        top: '0.01px', // Moved further up
                        right: '5px',
                        zIndex: 2,
                    }}
                >
                    <FavoriteIcon color="secondary" />
                </IconButton>
            </div>
    
            <div style={{
                width: '100%',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                flexGrow: 1
            }}>
                <div style={{
                    fontWeight: 'bold',
                    marginTop: '5px',
                    textAlign: 'left',
                    fontSize: '0.85rem', // Slightly smaller font size
                    color: '#333',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {item.productname}
                </div>
    
                <Divider style={{ margin: '5px 0' }} />
    
                <div style={{
                    fontWeight: 'bold',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    color: '#333'
                }}>
                    <div style={{ fontSize: '1.1rem', color: '#d32f2f' }}>
                        ₹{item.offerprice}
                        <del style={{ color: 'grey', fontSize: '0.75rem' }}> ₹{item.price}</del> {/* Reduced size */}
                    </div>
                    <div style={{ color: 'green', fontSize: '0.75rem' }}>
                        You save: <span style={{ fontWeight: 'bold' }}>₹{save}</span>
                    </div>
                </div>
    
                {/* Reviews Section */}
                <div style={{ marginTop: '5px', display: 'flex', alignItems: 'center', fontSize: '0.65rem' }}>
                    {/* Displaying 5 stars regardless of rating */}
                    {[...Array(5)].map((_, index) => (
                        <StarIcon key={index} style={{ color: '#FFD700', fontSize: '0.7rem' }} /> // Smaller stars
                    ))}
                    <span style={{ fontSize: '0.65rem', marginLeft: '5px', color: '#666' }}>
                        {item.rating} ({item.reviews} reviews)
                    </span>
                </div>
    
                {/* Adjusting PlusMinusComponent to take full width */}
                <div style={{ marginTop: '5%', width: '100%' }}>
                    <PlusMinusComponent
                        view=''
                        qty={productFromRedux[item.productdetailid] ? productFromRedux[item.productdetailid].qty : 0}
                        onChange={(v) => handlePlusMinus(v, item)}
                        style={{ width: '100%' }} // Ensure full width
                    />
                </div>
            </div>
        </div>
    );
}    
