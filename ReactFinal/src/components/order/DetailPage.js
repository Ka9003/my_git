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
  Button,
  TextField
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { AppContext } from "../../Context";

const SearchResult = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  let ifupdateing = 0;
  const [Searching, setSearching] = useState({});
  const { products, deleteOrderlist, updateDetail } = useContext(AppContext);
  const { orderlist } = useContext(AppContext);
  const { detail, Orderdetail, deleteDetail } = useContext(AppContext);
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
  };

  const deletebutton = (pid) => {
    let cc = localStorage.getItem('OrderId');
    let c = {};
    c.OrderId = cc;
    console.log(pid);
    console.log(c);
    deleteDetail(pid, c);
  };
  const updatebutton = (p) => {
    console.log(p);
    localStorage.setItem('OrderId', p.OrderId);
    localStorage.setItem('seq', p.seq);
    localStorage.setItem('update', '1');
    navigate('/app/d1', { replace: true });
  };

  const updateclick = (oid, pid, pname, unitprice) => {
    let c = {};
    c.seq = oid;
    c.OrderId = localStorage.getItem('OrderId');
    c.ProdId = pid;
    c.Qty = pname;
    c.Discount = unitprice;
    let cc = localStorage.getItem('OrderId');
    let d = {};
    d.OrderId = cc;
    console.log(c);
    updateDetail(c, d);
    navigate('/app/d1', { replace: true });
  };
  const todetail = (p) => {
    console.log(p);
    localStorage.setItem('OrderId', p.OrderId);
    let c = {};
    c.OrderId = p.OrderId;
    Orderdetail(c);
    navigate('/app/d1', { replace: true });
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
  return (localStorage.getItem('update') !== "1") ? (
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
                  產品代號
                </TableCell>
                <TableCell>
                  數量
                </TableCell>
                <TableCell>
                  折扣
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => { navigate('/app/d2', { replace: true }); }}
                  >
                    新增
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detail.slice(0, detail.length).map((product) => {
                if ((document.getElementById("list123").value !== null) && (document.getElementById("list123").value === " ")) {
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
                        {product.ProdId}
                      </TableCell>
                      <TableCell>
                        {product.Qty}
                      </TableCell>
                      <TableCell>
                        {product.Discount}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => { updatebutton(product); }}
                        >
                          更新
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => { deletebutton(product.seq); }}
                          sx={{ mx: 1 }}
                        >
                          刪除
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
                        {product.ProdId}
                      </TableCell>
                      <TableCell>
                        {product.Qty}
                      </TableCell>
                      <TableCell>
                        {product.Discount}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => { updatebutton(product); }}
                        >
                          更新
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => { deletebutton(product.seq); }}
                          sx={{ mx: 1 }}
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
                  訂單編號
                </TableCell>
                <TableCell>
                  產品代號
                </TableCell>
                <TableCell>
                  數量
                </TableCell>
                <TableCell>
                  折扣
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
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="oid"
                    disabled="true"
                    value={localStorage.getItem('OrderId')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="pid"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="qty"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="discount"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ mx: 1 }}
                    onClick={() => { navigate('/app/d1', { replace: true }); updateclick(localStorage.getItem('seq'), document.getElementById("pid").value, document.getElementById("qty").value, document.getElementById("discount").value); localStorage.clear(); }}
                  >
                    更新
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

SearchResult.propTypes = {
  customers: PropTypes.array.isRequired
};

export default SearchResult;
