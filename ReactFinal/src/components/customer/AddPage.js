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

const AddPage = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  let ifupdateing = 0;
  const [Searching, setSearching] = useState({});
  const { products, insertProduct, deleteProduct } = useContext(AppContext);
  const navigate = useNavigate();

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

  const insertclick = (pid, pname, unitprice, cost) => {
    let c = {};
    c.pid = pid;
    c.pname = pname;
    c.unitprice = unitprice;
    c.cost = cost;
    console.log(c);
    insertProduct(c);
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
  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
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
                    id="pid"
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
                    onClick={() => { console.log('insertclick'); insertclick(document.getElementById("pid").value, document.getElementById("pname").value, document.getElementById("unitprice").value, document.getElementById("cost").value); }}
                  >
                    新增
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

export default AddPage;
