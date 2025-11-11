// TransactionForm - Form component for adding/editing transactions
// Uses MUI components for professional styling

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography
} from '@mui/material';
import { useBudget } from '../context/BudgetContext';
import { TRANSACTION_TYPES, CATEGORIES } from '../utils/constants';
import { format } from 'date-fns';

const TransactionForm = () => {
  const { addTransaction } = useBudget();

  // Form state
  const [formData, setFormData] = useState({
    type: TRANSACTION_TYPES.EXPENSE,
    amount: '',
    category: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const [errors, setErrors] = useState({});

  // Update category options when type changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, category: '' }));
  }, [formData.type]);

  // Get categories based on transaction type
  const categoryOptions = CATEGORIES[formData.type] || [];

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (new Date(formData.date) > new Date()) {
      newErrors.date = 'Date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if form is valid (for disabling submit button)
  const isFormValid = () => {
    return (
      formData.amount &&
      parseFloat(formData.amount) > 0 &&
      formData.category &&
      formData.date &&
      new Date(formData.date) <= new Date()
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Add transaction
    addTransaction({
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date
    });

    // Reset form
    setFormData({
      type: formData.type, // Keep the same type
      amount: '',
      category: '',
      description: '',
      date: format(new Date(), 'yyyy-MM-dd')
    });
  };

  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add Transaction
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Transaction Type Toggle */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <ToggleButtonGroup
              value={formData.type}
              exclusive
              onChange={(e, newType) => newType && handleChange('type', newType)}
              fullWidth
              color="primary"
            >
              <ToggleButton value={TRANSACTION_TYPES.INCOME}>
                Income
              </ToggleButton>
              <ToggleButton value={TRANSACTION_TYPES.EXPENSE}>
                Expense
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>

          {/* Amount */}
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            error={!!errors.amount}
            helperText={errors.amount}
            inputProps={{ min: 0, step: 0.01 }}
            sx={{ mb: 2 }}
            required
          />

          {/* Category */}
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              label="Category"
              required
            >
              {categoryOptions.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                {errors.category}
              </Typography>
            )}
          </FormControl>

          {/* Date */}
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            error={!!errors.date}
            helperText={errors.date}
            InputLabelProps={{ shrink: true }}
            inputProps={{ max: format(new Date(), 'yyyy-MM-dd') }}
            sx={{ mb: 2 }}
            required
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description (optional)"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            multiline
            rows={2}
            inputProps={{ maxLength: 200 }}
            helperText={`${formData.description.length}/200 characters`}
            sx={{ mb: 2 }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            color={formData.type === TRANSACTION_TYPES.INCOME ? 'success' : 'error'}
            disabled={!isFormValid()}
          >
            Add {formData.type === TRANSACTION_TYPES.INCOME ? 'Income' : 'Expense'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;
