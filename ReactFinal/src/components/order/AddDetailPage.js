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

const AddDetailPage = () => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  let ifupdateing = 0;
  const [Searching, setSearching] = useState({});
  const { products, insertDetail, deleteProduct } = useContext(AppContext);
  const [ProdName, setProdName] = useState('');
  const [values, setValues] = useState({
    OrderId: '',
    EmpId: localStorage.getItem('id'),
    CustId: '',
    Descript: '',
    ProdId: '',
    Qty: '',
    Discount: '',
  });
  const navigate = useNavigate();

  const handleChangeProdName = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
    console.log(event.target.value);
    fetch('http://localhost/react-php/productinfo.php', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ ProdID: "EIDE1RP" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setProdName(data.users[0].ProdName);
        } else {
          console.log(data);
          setProdName('');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const insertclick = (oid, pid, pname, unitprice) => {
    let c = {};
    c.OrderId = oid;
    c.ProdId = pid;
    c.Qty = pname;
    c.Discount = unitprice;
    console.log(c);
    insertDetail(c);
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
                    onClick={() => { console.log('insertclick'); insertclick(document.getElementById("oid").value, document.getElementById("pid").value, document.getElementById("qty").value, document.getElementById("discount").value); }}
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

export default AddDetailPage;
