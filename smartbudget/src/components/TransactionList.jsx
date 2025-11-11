// TransactionList - Displays list of transactions with edit/delete actions
// Uses MUI Table and components for clean presentation

import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useBudget } from '../context/BudgetContext';
import { TRANSACTION_TYPES, COLORS } from '../utils/constants';
import { format } from 'date-fns';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useBudget();
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const toggleRowExpansion = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const truncateDescription = (description, id) => {
    if (!description) return '-';
    if (description.length <= 30) return description;

    const isExpanded = expandedRows.has(id);

    return (
      <Box>
        <Box component="span" sx={{ display: 'block', wordBreak: 'break-word', mb: 0.5 }}>
          {isExpanded ? description : `${description.substring(0, 30)}...`}
        </Box>
        <Link
          component="button"
          variant="body2"
          onClick={() => toggleRowExpansion(id)}
          sx={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          {isExpanded ? (
            <>
              <ExpandLessIcon fontSize="small" />
              Show less
            </>
          ) : (
            <>
              <ExpandMoreIcon fontSize="small" />
              Expand
            </>
          )}
        </Link>
      </Box>
    );
  };

  const handleDeleteClick = (id) => {
    setTransactionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  if (transactions.length === 0) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No transactions yet. Add your first transaction above!
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Transactions ({transactions.length})
        </Typography>

        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ verticalAlign: 'top', width: '120px' }}>{formatDate(transaction.date)}</TableCell>
                  <TableCell sx={{ verticalAlign: 'top', maxWidth: '250px', width: '250px' }}>
                    {truncateDescription(transaction.description, transaction.id)}
                  </TableCell>
                  <TableCell sx={{ verticalAlign: 'top', width: '140px' }}>{transaction.category}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 'bold',
                      color: transaction.type === TRANSACTION_TYPES.INCOME
                        ? COLORS.income
                        : COLORS.expense,
                      verticalAlign: 'top'
                    }}
                  >
                    {transaction.type === TRANSACTION_TYPES.INCOME ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(transaction.id)}
                      aria-label="delete transaction"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>

    <Dialog
      open={deleteDialogOpen}
      onClose={handleDeleteCancel}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete this transaction? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default TransactionList;
