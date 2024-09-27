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
};

export function ModalView({
  title,
  children,
  onClose,
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
