import { useMediaQuery, Grid } from "@mui/material";
import { serverurl } from "../../services/fetchnodeservices";
import { useTheme } from '@mui/material/styles';

export default function ShippingComponent() {

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(450));

    // Items for Shipping Info
    const items = [
        { head: 'FREE SHIPPING', text: 'Free Shipping Order INR 100', icon: 's1.png' },
        { head: 'SECURE PAYMENT', text: 'We Value Your Security', icon: 's2.png' },
        { head: 'ONLINE SUPPORT', text: 'We Have Support 24/7', icon: 's3.png' },
        { head: 'PAYMENT ON DELIVERY', text: 'Cash On Delivery Option', icon: 's4.png' },
    ];

    // Function to render the items
    const showItems = () => {
        return items.map((item, index) => (
            <div 
                key={index}
                style={{
                    display: 'flex',
                    width: isVerySmallScreen ? '100%' : '20%', // Full width on very small screens
                    justifyContent: isVerySmallScreen ? 'flex-start' : 'center',
                    gap: '7%',
                    margin: isVerySmallScreen ? '10px 0' : '',
                    flex: isMediumScreen ? '0 0 35%' : '' // Adjust width for medium screens
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'start', width: '85%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '5%' }}>
                        <img 
                            src={`${serverurl}/images/${item.icon}`} 
                            width={isVerySmallScreen ? '40px' : '100%'} 
                            alt={item.head} 
                            style={{ maxWidth: isVerySmallScreen ? '40px' : '80px', objectFit: 'contain' }}
                        />
                    </div>

                    <div>
                        <h3 style={{
                            marginBottom: 0,
                            fontSize: isVerySmallScreen ? '0.9rem' : isSmallScreen ? '1rem' : '1.1rem',
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                        }}>
                            {item.head}
                        </h3>
                        <p style={{
                            marginTop: '5px',
                            fontSize: isVerySmallScreen ? '0.7rem' : isSmallScreen ? '0.85rem' : '0.9rem',
                            letterSpacing: '0.5px'
                        }}>
                            {item.text}
                        </p>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div style={{
            width: isVerySmallScreen ? '90%' : '100%',
            background: '#fff',
            margin: 'auto', // Center the component on the page
            padding: isVerySmallScreen ? '10px 0' : '20px 0' // Add padding to create space
        }}>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: isVerySmallScreen ? 'flex-start' : 'center',
                justifyContent: isMediumScreen ? 'center' : 'space-between',
                flexDirection: isVerySmallScreen ? 'column' : 'row',
                flexWrap: 'wrap'
            }}>
                {showItems()}
            </div>
        </div>
    );
}
