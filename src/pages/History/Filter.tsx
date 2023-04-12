import { Button, Stack } from '@mui/material';
import FilterItem from './FilterItem';
import { useState } from 'react';

const Filter = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Stack marginY={3} direction="row" spacing={2}>
            <FilterItem
                label="Status"
                dialog={{
                    title: 'Status Riwayat',
                    content: 'Are you sure?',
                    onOpen: handleOpen,
                    open,
                    action: (
                        <Stack width="100%" direction="row" justifyContent="space-between">
                            <Button size="small" variant="contained">
                                Apply
                            </Button>
                            <Button size="small" variant="outlined" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Stack>
                    ),
                }}
            />
        </Stack>
    );
};

export default Filter;
