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
  const { products, insertOrderlist, deleteProduct } = useContext(AppContext);
  const { userinfo } = useContext(AppContext);
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

  const insertclick = (oid, pid, pname, unitprice, cost) => {
    let c = {};
    c.OrderId = oid;
    c.EmpId = pid;
    c.CustId = pname;
    c.OrderDate = unitprice;
    c.Descript = cost;
    console.log(c);
    insertOrderlist(c);
    navigate('/app/o1', { replace: true });
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
                  訂單日期
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
              <TableRow>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="oid"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="eid"
                    value={userinfo[0].EmpId}
                    disabled="true"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="cid"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="date"
                    variant="outlined"
                    id="orderdate"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    id="remark"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ mx: 1 }}
                    onClick={() => { console.log('insertclick'); insertclick(document.getElementById("oid").value, document.getElementById("eid").value, document.getElementById("cid").value, document.getElementById("orderdate").value, document.getElementById("remark").value); }}
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
