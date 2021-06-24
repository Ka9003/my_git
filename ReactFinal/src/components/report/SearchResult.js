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
  const { income } = useContext(AppContext);
  const navigate = useNavigate();
  return (localStorage.getItem('update') === "1") ? (
    ""
  ) : (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  客戶名稱
                </TableCell>
                <TableCell>
                  客戶代號
                </TableCell>
                <TableCell>
                  總收入
                </TableCell>
                <TableCell>
                  總利潤
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {income.slice(0, income.length).map((i) => (
                <TableRow>
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
                        {i.CustName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {i.CustId}
                  </TableCell>
                  <TableCell>
                    {i.revenue}
                  </TableCell>
                  <TableCell>
                    {i.profit}
                  </TableCell>
                </TableRow>
              ))}
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
