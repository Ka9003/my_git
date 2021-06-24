import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SearchResult from 'src/components/customer/SearchResult';
import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
import customers from 'src/__mocks__/customers';

const S1 = () => (
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
          <SearchResult customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default S1;
