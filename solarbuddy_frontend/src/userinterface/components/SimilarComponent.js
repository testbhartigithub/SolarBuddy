import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { postData, serverurl } from '../../services/fetchnodeservices'; // Adjust this import path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function SimilarComponent({ currentProduct }) {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Declare the navigate hook

  useEffect(() => {
    if (currentProduct && currentProduct.productid && currentProduct.categoryid) {
      fetchSimilarProducts();
    } else {
      setError('Invalid product data');
      setLoading(false);
    }
  }, [currentProduct]);

  const fetchSimilarProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await postData('userinterface/fetch_similar_products', {
        productId: currentProduct.productid,
        categoryId: currentProduct.categoryid,
      });

      if (result.status) {
        setSimilarProducts(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch similar products');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching similar products');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (product) => {
    navigate('/showproductdetails', { state: { product } });
  };

  if (loading) return <div>Loading similar products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', padding: '20px' }}>
      <Typography
        variant="h4"
        component="h2"
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '30px',
          fontFamily: 'Poppins',
        }}
      >
        Similar Products
      </Typography>

      {similarProducts.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {similarProducts.map((product) => (
            <Grid item xs={6} sm={4} md={3} key={product.productid}>
              <Card
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  height="180" // Fixed height for the image
                  image={product.icon ? `${serverurl}/images/${product.icon}` : '/placeholder.svg'}
                  alt={product.productname}
                  style={{
                    objectFit: 'contain',
                    padding: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleViewDetails(product)}
                />

                <CardContent style={{ flexGrow: 1, padding: '16px', textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{
                      fontWeight: '600',
                      fontSize: '1rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginBottom: '8px',
                    }}
                  >
                    {product.productname}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      marginBottom: '10px',
                      textAlign: 'left', // Align price to the left
                    }}
                  >
                    ₹{parseFloat(product.offerprice).toFixed(2)}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleViewDetails(product)}
                    style={{
                      fontWeight: 'bold',
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      padding: '8px 0',
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" style={{ textAlign: 'center' }}>
          No similar products found.
        </Typography>
      )}
    </div>
  );
}
