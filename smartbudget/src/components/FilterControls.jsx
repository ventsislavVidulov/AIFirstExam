// FilterControls - Transaction filtering UI component
// Provides date range and type filters with immediate application

import { Paper, Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { useBudget } from '../context/BudgetContext';

const FilterControls = () => {
  const { filters, updateFilters } = useBudget();

  const handleStartDateChange = (e) => {
    updateFilters({ startDate: e.target.value || null });
  };

  const handleEndDateChange = (e) => {
    updateFilters({ endDate: e.target.value || null });
  };

  const handleTypeChange = (e) => {
    updateFilters({ type: e.target.value });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Filter Transactions
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
        {/* Start Date */}
        <TextField
          label="Start Date"
          type="date"
          value={filters.startDate || ''}
          onChange={handleStartDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ flex: 1 }}
        />

        {/* End Date */}
        <TextField
          label="End Date"
          type="date"
          value={filters.endDate || ''}
          onChange={handleEndDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ flex: 1 }}
        />

        {/* Type Filter */}
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={filters.type || 'all'}
            label="Type"
            onChange={handleTypeChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expenses</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default FilterControls;
