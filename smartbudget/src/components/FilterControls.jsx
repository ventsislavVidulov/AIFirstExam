// FilterControls - Transaction filtering UI component
// Provides date range and type filters with immediate application

import { Paper, Box, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Button, Chip, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useBudget } from '../context/BudgetContext';
import { format } from 'date-fns';

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

  // Check if any filters are active
  const hasActiveFilters = () => {
    return filters.startDate || filters.endDate || (filters.type && filters.type !== 'all');
  };

  // Clear all filters
  const handleClearFilters = () => {
    updateFilters({ startDate: null, endDate: null, type: 'all' });
  };

  // Format date for chip display
  const formatDateChip = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Filter Transactions
        </Typography>

        {/* Clear Filters Button - Only show when filters are active */}
        {hasActiveFilters() && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ClearIcon />}
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 2 }}>
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

      {/* Active Filter Indicators */}
      {hasActiveFilters() && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Active Filters:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {filters.startDate && (
              <Chip
                label={`From: ${formatDateChip(filters.startDate)}`}
                onDelete={() => updateFilters({ startDate: null })}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {filters.endDate && (
              <Chip
                label={`To: ${formatDateChip(filters.endDate)}`}
                onDelete={() => updateFilters({ endDate: null })}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {filters.type && filters.type !== 'all' && (
              <Chip
                label={`Type: ${filters.type.charAt(0).toUpperCase() + filters.type.slice(1)}`}
                onDelete={() => updateFilters({ type: 'all' })}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Stack>
        </Box>
      )}
    </Paper>
  );
};

export default FilterControls;
