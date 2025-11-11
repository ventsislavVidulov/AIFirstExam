// Charts - Data visualization component using Chart.js
// Displays pie chart for expense breakdown and bar chart for trends

import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { useBudget } from '../context/BudgetContext';
import { getCategoryBreakdown, calculateTotalIncome, calculateTotalExpenses } from '../utils/calculations';
import { COLORS } from '../utils/constants';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Charts = () => {
  const { transactions } = useBudget();
  const categoryBreakdown = getCategoryBreakdown(transactions);

  // Prepare data for pie chart
  const pieChartData = {
    labels: Object.keys(categoryBreakdown),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryBreakdown),
        backgroundColor: COLORS.chartColors,
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Expense Distribution by Category'
      }
    }
  };

  // Prepare data for bar chart (Income vs Expenses)
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);

  const barChartData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount',
        data: [income, expenses],
        backgroundColor: [COLORS.income, COLORS.expense],
        borderColor: [COLORS.income, COLORS.expense],
        borderWidth: 1
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Income vs Expenses'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  // Check if there's data to display
  const hasExpenses = Object.keys(categoryBreakdown).length > 0;
  const hasTransactions = transactions.length > 0;

  if (!hasTransactions) {
    return (
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Charts
          </Typography>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No data to display. Add some transactions to see visualizations!
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Pie Chart - Expense Breakdown */}
      {hasExpenses && (
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Pie data={pieChartData} options={pieChartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}

      {/* Bar Chart - Income vs Expenses */}
      <Grid item xs={12} md={hasExpenses ? 6 : 12}>
        <Card elevation={2}>
          <CardContent>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bar data={barChartData} options={barChartOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
