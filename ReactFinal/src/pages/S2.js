import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AddPage from 'src/components/customer/AddPage';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';

const S2 = () => (
  <>
    <Helmet>
      <title>Produsts | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <AddPage customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default S2;
