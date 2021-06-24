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
  const { products, orderlist } = useContext(AppContext);
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
                  序號
                </TableCell>
                <TableCell>
                  訂單編號
                </TableCell>
                <TableCell>
                  員工代號
                </TableCell>
                <TableCell>
                  客戶代號
                </TableCell>
                <TableCell>
                  訂貨日期
                </TableCell>
                <TableCell>
                  備註
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
              {orderlist.slice(0, orderlist.length).map((product) => {
                if (true) {
                  return (
                    <TableRow
                      hover
                      key={products.OrderId}
                      selected={selectedCustomerIds.indexOf(product.OrderId) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedCustomerIds.indexOf(product.OrderId) !== -1}
                          onChange={(event) => handleSelectOne(event, product.OrderId)}
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
                            {product.seq}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {product.OrderId}
                      </TableCell>
                      <TableCell>
                        {product.EmpId}
                      </TableCell>
                      <TableCell>
                        {product.CustId}
                      </TableCell>
                      <TableCell>
                        {product.OrderDate}
                      </TableCell>
                      <TableCell>
                        {product.Descript}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                        >
                          更新
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          sx={{ mx: 1 }}
                        >
                          刪除
                        </Button>
                        <Button
                          variant="outlined"
                        >
                          明細
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
                if (product.OrderId.indexOf(document.getElementById("list123").value) !== -1) {
                  return (
                    <TableRow
                      hover
                      key={orderlist.pid}
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
                            {product.seq}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {product.OrderId}
                      </TableCell>
                      <TableCell>
                        {product.EmpId}
                      </TableCell>
                      <TableCell>
                        {product.CustId}
                      </TableCell>
                      <TableCell>
                        {product.OrderDate}
                      </TableCell>
                      <TableCell>
                        {product.Descript}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                        >
                          更新
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          sx={{ mx: 1 }}
                        >
                          刪除
                        </Button>
                        <Button
                          variant="outlined"
                        >
                          明細
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
