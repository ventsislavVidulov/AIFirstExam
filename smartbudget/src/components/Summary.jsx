// Summary - Displays financial summary cards (Income, Expenses, Balance)
// Uses MUI Grid and Cards for responsive layout

import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useBudget } from '../context/BudgetContext';
import { calculateTotalIncome, calculateTotalExpenses, calculateBalance } from '../utils/calculations';
import { COLORS } from '../utils/constants';

const Summary = () => {
  const { transactions } = useBudget();
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const balance = calculateBalance(totalIncome, totalExpenses);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const summaryCards = [
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: COLORS.income,
      bgColor: '#E8F5E9'
    },
    {
      title: 'Total Expenses',
      amount: totalExpenses,
      icon: <TrendingDownIcon sx={{ fontSize: 40 }} />,
      color: COLORS.expense,
      bgColor: '#FFEBEE'
    },
    {
      title: 'Balance',
      amount: balance,
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
      color: balance >= 0 ? COLORS.income : COLORS.expense,
      bgColor: balance >= 0 ? '#E3F2FD' : '#FFF3E0'
    }
  ];

  return (
    <Grid container spacing={3}>
      {summaryCards.map((card, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card
            elevation={3}
            sx={{
              background: `linear-gradient(135deg, ${card.bgColor} 0%, #ffffff 100%)`,
              height: '100%'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    color: card.color,
                    mr: 2
                  }}
                >
                  {card.icon}
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', color: card.color }}
                  >
                    {formatCurrency(card.amount)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Summary;
