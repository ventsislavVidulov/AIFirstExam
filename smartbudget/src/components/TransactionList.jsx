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
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useBudget } from '../context/BudgetContext';
import { TRANSACTION_TYPES, COLORS } from '../utils/constants';
import { format } from 'date-fns';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useBudget();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // lg breakpoint = 1200px
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // sm breakpoint = 600px

  const [expandedRows, setExpandedRows] = useState(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [descriptionDialogOpen, setDescriptionDialogOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const toggleRowExpansion = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
    setDescriptionDialogOpen(true);
  };

  const handleDescriptionDialogClose = () => {
    setDescriptionDialogOpen(false);
    setSelectedDescription('');
  };

  const truncateDescription = (description, id) => {
    if (!description) return '-';
    if (description.length <= 30) return description;

    // On mobile/tablet (<1024px): Show "Expand description" that opens modal
    if (!isDesktop) {
      return (
        <Link
          component="button"
          variant="body2"
          onClick={() => handleDescriptionClick(description)}
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
          <ExpandMoreIcon fontSize="small" />
          Expand description
        </Link>
      );
    }

    // On desktop (≥1024px): Show expandable text in same cell
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
    // Shorter format on mobile to save space
    if (isMobile) {
      return format(new Date(dateString), 'MMM dd');
    }
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
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: isMobile ? '60px' : '120px' }}>Date</TableCell>
                <TableCell>Desc.</TableCell>
                {!isMobile && <TableCell>Category</TableCell>}
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center" sx={{ width: '50px' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      verticalAlign: 'top',
                      width: isMobile ? '60px' : '120px',
                      fontSize: isMobile ? '0.75rem' : 'inherit'
                    }}
                  >
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell
                    sx={{
                      verticalAlign: 'top',
                      maxWidth: isMobile ? '150px' : '250px',
                      fontSize: isMobile ? '0.875rem' : 'inherit'
                    }}
                  >
                    {truncateDescription(transaction.description, transaction.id)}
                  </TableCell>
                  {!isMobile && (
                    <TableCell sx={{ verticalAlign: 'top', width: '140px' }}>
                      {transaction.category}
                    </TableCell>
                  )}
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 'bold',
                      color: transaction.type === TRANSACTION_TYPES.INCOME
                        ? COLORS.income
                        : COLORS.expense,
                      verticalAlign: 'top',
                      fontSize: isMobile ? '0.875rem' : 'inherit',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {transaction.type === TRANSACTION_TYPES.INCOME ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell align="center" sx={{ verticalAlign: 'top', width: '50px' }}>
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

    {/* Delete Confirmation Dialog */}
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

    {/* Description Modal (Mobile/Tablet <1024px) */}
    <Dialog
      open={descriptionDialogOpen}
      onClose={handleDescriptionDialogClose}
      aria-labelledby="description-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="description-dialog-title">
        Transaction Description
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', pt: 1 }}>
          {selectedDescription}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDescriptionDialogClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default TransactionList;
