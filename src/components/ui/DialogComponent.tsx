import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

interface Props {
    title: string;
    open: boolean;
    action: React.ReactNode;
    content: React.ReactNode | string;
    onOpen: () => void;
}

const DialogComponent = ({ title, open, onOpen, content, action }: Props) => {
    return (
        <Dialog open={open} onClose={onOpen} aria-labelledby="dialog-title" aria-describedby="aria-description">
            <DialogTitle id="dialog-title" fontWeight={700}>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="dialog-description">{content}</DialogContentText>
            </DialogContent>
            <DialogActions>{action}</DialogActions>
        </Dialog>
    );
};

export default DialogComponent;
