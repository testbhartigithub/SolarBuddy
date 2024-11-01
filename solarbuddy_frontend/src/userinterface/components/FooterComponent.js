import { Divider, Grid } from "@mui/material";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { serverurl } from "../../services/fetchnodeservices";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function FooterComponent() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // For small screens
    const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(450)); // For very small screens
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md')); // For medium screens
    const isLargeScreen = useMediaQuery(theme.breakpoints.down(1200)); // For larger screens

    const details = [
        'F-1107 Block-1, First Floor Ardente Office One, Hoodi Circle K.R. Puram, Bangalore - 560048',
        '+91 93723723821',
        'solarbuddy@gmail.com'
    ];

    const information = [
        { text: 'About us', link: '' },
        { text: 'Contact us', link: '' },
        { text: 'Shipping Policy', link: '' },
        { text: 'Payment Policy', link: '' },
        { text: 'Privacy Policy', link: '' },
        { text: 'Cancellation and Returns Policy', link: '' },
        { text: 'Terms and Conditions', link: '' },
    ];

    const account = [
        { text: 'My Account', link: '' },
        { text: 'Wishlist', link: '' },
        { text: 'Order History', link: '' },
        { text: 'Become a Vendor', link: '' },
        { text: 'Become an Affiliate', link: '' },
        { text: 'Become a Seller', link: '' },
    ];

    const extra = [
        { text: 'Site Map', link: '' },
        { text: 'Shop By Brand', link: '' },
        { text: 'Shop By City', link: '' },
        { text: 'Shop By Pincode', link: '' },
        { text: 'SolarClue Projects', link: '' },
        { text: 'Pay Online', link: '' },
        { text: 'Investor Relations', link: '' },
    ];

    const showDetails = () => {
        return details.map((item) => (
            <ListItemButton style={{ padding: 0 }} key={item}>
                <ListItemText>
                    <span style={{ fontSize: isSmallScreen ? '0.8rem' : '0.7rem' }}>
                        <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />
                        {item}
                    </span>
                </ListItemText>
            </ListItemButton>
        ));
    };

    const showInformation = () => {
        return information.map((item) => (
            <ListItemButton style={{ padding: 0 }} key={item.text}>
                <ListItemText>
                    <span style={{ fontSize: isSmallScreen ? '0.9rem' : '0.7rem' }}>
                        <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />
                        {item.text}
                    </span>
                </ListItemText>
            </ListItemButton>
        ));
    };

    const showMyAccount = () => {
        return account.map((item) => (
            <ListItemButton style={{ padding: 0 }} key={item.text}>
                <ListItemText>
                    <span style={{ fontSize: isSmallScreen ? '0.9rem' : '0.7rem' }}>
                        <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />
                        {item.text}
                    </span>
                </ListItemText>
            </ListItemButton>
        ));
    };

    const showExtra = () => {
        return extra.map((item) => (
            <ListItemButton style={{ padding: 0 }} key={item.text}>
                <ListItemText>
                    <span style={{ fontSize: isSmallScreen ? '0.9rem' : '0.7rem' }}>
                        <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />
                        {item.text}
                    </span>
                </ListItemText>
            </ListItemButton>
        ));
    };

    return (
        <div style={{ width: isLargeScreen ? '85%' : '97%', margin: 'auto' }}>
            <Grid container spacing={isSmallScreen ? 1 : 2}>
                <Grid item md={3} sm={6} xs={12}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img
                            src={`${serverurl}/images/solar.png`}
                            style={{
                                width: isVerySmallScreen ? '30%' : '17%',
                                height: isVerySmallScreen ? '30%' : '17%',
                                marginLeft: '2%',
                                marginTop: '1%'
                            }}
                            alt="Solar Buddy Logo"
                        />
                        <div style={{ fontWeight: 'bolder', color: '#f1c40f', fontSize: isSmallScreen ? '4vw' : '2vw' }}>
                            Solar
                        </div>
                        <div style={{ fontWeight: 'bolder', color: 'black', fontSize: isSmallScreen ? '4vw' : '2vw' }}>
                            Buddy
                        </div>
                    </div>

                    <List>{showDetails()}</List>
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <List>
                        <ListItemButton style={{ paddingLeft: 0 }}>
                            <ListItemText>
                                <span style={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', fontWeight: 'bold' }}>
                                    INFORMATION
                                </span>
                            </ListItemText>
                        </ListItemButton>
                        <Divider />
                        {showInformation()}
                    </List>
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <List>
                        <ListItemButton style={{ paddingLeft: 0 }}>
                            <ListItemText>
                                <span style={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', fontWeight: 'bold' }}>
                                    MY ACCOUNT
                                </span>
                            </ListItemText>
                        </ListItemButton>
                        <Divider />
                        {showMyAccount()}
                    </List>
                </Grid>

                <Grid item md={3} sm={6} xs={12}>
                    <List>
                        <ListItemButton style={{ paddingLeft: 0 }}>
                            <ListItemText>
                                <span style={{ fontSize: isSmallScreen ? '1rem' : '1.1rem', fontWeight: 'bold' }}>
                                    EXTRA
                                </span>
                            </ListItemText>
                        </ListItemButton>
                        <Divider />
                        {showExtra()}
                    </List>
                </Grid>
            </Grid>
        </div>
    );
}
