import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import SearchResult from 'src/components/report/SearchResult';
import ProductListToolbar from 'src/components/report/ProductListToolbar';
import customers from 'src/__mocks__/customers';

const Report = () => (
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
        <ProductListToolbar />
        <Box sx={{ pt: 3 }}>
          <SearchResult customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default Report;
