// App.jsx - Main application component
// Integrates all components with MUI theme and BudgetProvider

import { Container, Typography, Box, AppBar, Toolbar, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { BudgetProvider } from './context/BudgetContext';
import Summary from './components/Summary';
import FilterControls from './components/FilterControls';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';

// Create MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
    },
    secondary: {
      main: '#8B5CF6',
    },
    success: {
      main: '#10B981',
    },
    error: {
      main: '#EF4444',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BudgetProvider>
        {/* App Bar */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <AccountBalanceIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SmartBudget
            </Typography>
            <Typography variant="body2">
              Personal Finance Manager
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Summary Cards */}
          <Box sx={{ mb: 4 }}>
            <Summary />
          </Box>

          {/* Filter Controls */}
          <FilterControls />

          {/* Transaction Form and List */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 400px' } }}>
              <TransactionForm />
            </Box>
            <Box sx={{ flex: 1 }}>
              <TransactionList />
            </Box>
          </Box>

          {/* Charts */}
          <Box sx={{ mb: 4 }}>
            <Charts />
          </Box>

          {/* Footer */}
          <Paper elevation={0} sx={{ p: 2, mt: 4, textAlign: 'center', bgcolor: 'grey.100' }}>
            <Typography variant="body2" color="text.secondary">
              Built with BMAD Methodology | AI-First Development Demo
            </Typography>
          </Paper>
        </Container>
      </BudgetProvider>
    </ThemeProvider>
  );
}

export default App;
