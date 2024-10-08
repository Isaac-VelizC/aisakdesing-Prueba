import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme,
} from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";

type DialogViewProps = DialogProps & {
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  onDelete: () => void;
  onUpdate?: () => void;
};

export function ModalView({
  title,
  children,
  onClose,
  onDelete,
  onUpdate,
  open,
  ...other
}: DialogViewProps) {
  const theme = useTheme();
  return (
    <Dialog
      transitionDuration={{
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
      }}
      open={open}
      onClose={onClose}
      {...other}
    >
      <DialogTitle variant={'h3'}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={onDelete}>
          Eliminar
        </Button>
        <Button variant="contained" color="warning" onClick={onUpdate}>
          Update
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
