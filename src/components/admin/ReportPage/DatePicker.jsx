import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import { Button, Dialog, DialogActions } from '@mui/material';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { asyncGetReports } from '../../../states/salesReport/action';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

export function DatePicker({ open, setIsDateOpen }) {
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const formatDate = (dateRange) => {
    const formattedDate = {
      startDate: moment(dateRange.startDate).format('YYYY-MM-DD'),
      endDate: moment(dateRange.endDate).format('YYYY-MM-DD'),
    };

    return formattedDate;
  };

  const handleSubmit = async () => {
    try {
      const formattedDate = formatDate(date[0]);
      dispatch(asyncGetReports(formattedDate));
      updateQueryParams({
        startDate: formattedDate?.startDate,
        endDate: formattedDate?.endDate,
        page: 1,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setIsDateOpen(false)}>
      <DateRangePicker
        onChange={(item) => setDate([item.selection])}
        showSelectionPreview
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={date}
        direction="vertical"
      />
      <DialogActions>
        <Button
          onClick={() => {
            handleSubmit();
            setIsDateOpen(false);
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
