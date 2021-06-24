import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SearchResult from 'src/components/order/SearchResult';
import OrderListToolbar from 'src/components/order/CustomerListToolbar';
import customers from 'src/__mocks__/customers';

const O1 = () => (
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
          <SearchResult customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default O1;
