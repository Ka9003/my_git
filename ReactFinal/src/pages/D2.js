import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AddDetailPage from 'src/components/order/AddDetailPage';
import OrderListToolbar from 'src/components/order/CustomerListToolbar';
import customers from 'src/__mocks__/customers';

const D2 = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <OrderListToolbar />
        <Box sx={{ pt: 3 }}>
          <AddDetailPage customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default D2;
