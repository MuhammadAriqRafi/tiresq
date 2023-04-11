import { RxChevronDown } from 'react-icons/rx';
import { Chip } from '@mui/material';
import DialogComponent from '../../components/ui/DialogComponent';

interface FilterItemDialog {
    title: string;
    open: boolean;
    action: React.ReactNode;
    content: React.ReactNode;
    onOpen: () => void;
}

interface Props {
    label: string;
    dialog: FilterItemDialog;
}

const FilterItem = ({ label, dialog }: Props) => {
    const { title, content, action, open, onOpen } = dialog;

    return (
        <>
            <Chip sx={{ fontWeight: 700, border: '1px solid #E4E4E4' }} label={label} color="default" onClick={onOpen} onDelete={onOpen} deleteIcon={<RxChevronDown size="18px" color="black" />} />;
            <DialogComponent title={title} open={open} onOpen={onOpen} content={content} action={action} />
        </>
    );
};

export default FilterItem;
