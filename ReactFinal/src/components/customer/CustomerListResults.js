import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { AppContext } from "../../Context";

const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  let s1 = 0;
  const [Searching, setSearching] = useState({});
  const { products } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;
    console.log(products);
    console.log(document.getElementById('123').value);
    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    setSearching("1");
    console.log(Searching);
    products.slice(0, limit).map((product) => {
      if (product.pname === "EnhanceIDE PCI BUS") {
        console.log(product);
        return product;
      }
      return 123;
    });
  };

  const handleSelect = (event) => {
    console.log(Searching);
    navigate('/app/s1', { replace: true });
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (true) ? (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  產品名稱
                </TableCell>
                <TableCell>
                  產品代號
                </TableCell>
                <TableCell>
                  單價
                </TableCell>
                <TableCell>
                  成本
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    動作
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(0, products.length).map((product) => {
                if (true) {
                  return (
                    <TableRow
                      hover
                      key={products.pid}
                      selected={selectedCustomerIds.indexOf(product.pid) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(product.pid) !== -1}
                          onChange={(event) => handleSelectOne(event, product.pid)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Typography
                            color="textPrimary"
                            variant="body1"
                          >
                            {product.pname}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {product.pid}
                      </TableCell>
                      <TableCell>
                        {product.unitprice}
                      </TableCell>
                      <TableCell>
                        {product.cost}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                          sx={{ mx: 1 }}
                        >
                          更新
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                        >
                          刪除
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
                return "";
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={25}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  ) : (
    <Checkbox
      checked={selectedCustomerIds.length === customers.length}
      color="primary"
      indeterminate={
      selectedCustomerIds.length > 0
      && selectedCustomerIds.length < customers.length
      }
      onChange={handleSelect}
    />
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};

export default CustomerListResults;
