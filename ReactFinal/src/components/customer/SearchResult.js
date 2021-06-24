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
  const { products, deleteProduct, updateProduct } = useContext(AppContext);
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
    console.log(pid);
    deleteProduct(pid);
  };
  const updatebutton = (p) => {
    console.log(p);
    localStorage.setItem('pid', p.pid);
    localStorage.setItem('update', '1');
    navigate('/app/s1', { replace: true });
  };

  const updateclick = (pid, pname, unitprice, cost) => {
    console.log(pname);
    console.log(unitprice);
    console.log(cost);
    let c = {};
    c.pid = pid;
    c.pname = pname;
    c.unitprice = unitprice;
    c.cost = cost;
    console.log(c);
    updateProduct(c);
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
                if ((document.getElementById("123").value !== null) && (document.getElementById("123").value === " ")) {
                  console.log(product);
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
                          onClick={() => { updatebutton(product); }}
                          sx={{ mx: 1 }}
                        >
                          更新
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => { deletebutton(product.pid); }}
                        >
                          刪除
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
                if (product.pname.indexOf(document.getElementById("123").value) !== -1) {
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
                          onClick={() => { updatebutton(product); }}
                          sx={{ mx: 1 }}
                        >
                          更新
                        </Button>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => { deletebutton(product.pid); }}
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
                    id="pname"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    disabled="true"
                    id="pid"
                    value={localStorage.getItem('pid')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="unitprice"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="cost"
                    name="cost"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ mx: 1 }}
                    onClick={() => { localStorage.clear(); navigate('/app/s1', { replace: true }); updateclick(document.getElementById("pid").value, document.getElementById("pname").value, document.getElementById("unitprice").value, document.getElementById("cost").value); }}
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
