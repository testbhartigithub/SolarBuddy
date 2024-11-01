import { useEffect, useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DetailPlusMinus(props) {
    const [value, setValue] = useState(0);  // Holds the qty
    let navigate = useNavigate();

    // Set the initial value from props.qty
    useEffect(() => {
        setValue(props.qty || 0);  // Default to 0 if no qty is provided
    }, [props.qty]);

    // Handle increasing the qty
    const handlePlus = () => {
        let v = value + 1;
        setValue(v);
        props.onChange(v);  // Notify the parent component of the change
    };

    // Handle decreasing the qty
    const handleMinus = () => {
        let v = value;
        if (v >= 1) {
            v = v - 1;
            setValue(v);
            props.onChange(v);  // Notify the parent component of the change
        }
    };

    // Handle Buy Now Button Click (also adds the item to cart)
    const handleBuyBtn = () => {
        let v = value;
        if (v === 0) {  // If nothing is added, ensure at least 1 item is added to cart
            v = 1;
            setValue(v);
            props.onChange(v);
        }
        navigate('/cart');  // Navigate to the cart page
    };

    return (
        <div style={{ margin: '20px 0', display: 'flex', gap: '1rem' }}>
            {/* Add to Cart Button */}
            {value==0? <Button
                variant="contained"
                color="primary"
                onClick={handlePlus}  // Handles the Add to Cart functionality
                style={{ backgroundColor: '#1D8BF1', color: '#fff' }}
            >
                
                Add to Cart<AddShoppingCartIcon style={{ marginLeft: '5px' }} />
            </Button>:<div style={{display:'flex',width:50,padding:"1px 8px 1px 8px",justifyContent:"space-between",alignItems:'center',flexDirection:'row',borderRadius:5,color:'#fff',background:'#1e90ff',marginRight:'4%' }}>
        <div onClick={handlePlus} style={{fontWeight:'bolder',cursor:'pointer',marginRight:'2%'}}>+</div>
        <div style={{fontWeight:'bolder',cursor:'pointer'}}>{value}</div>
        <div onClick={handleMinus} style={{fontWeight:'bolder',cursor:'pointer',marginLeft:'2%'}}>-</div>
    </div>}

            {/* Buy Now Button */}
            <Button
                variant="outlined"
                color="primary"
                onClick={handleBuyBtn}  // Handles the Buy Now functionality (Adds and navigates)
                style={{ borderColor: '#1D8BF1', color: '#1D8BF1' }}
            >
                Buy Now
            </Button>
        </div>
    );
}
