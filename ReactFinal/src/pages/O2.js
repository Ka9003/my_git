import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AddPage from 'src/components/order/AddPage';
import OrderListToolbar from 'src/components/order/CustomerListToolbar';
import customers from 'src/__mocks__/customers';

const O2 = () => (
  <>
    <Helmet>
      <title>Orderlist | Material Kit</title>
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
          <AddPage customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default O2;
