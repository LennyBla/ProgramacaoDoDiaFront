import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface SessaoExpiradaDialogProps {
  open: boolean;
  onClose: () => void;
}

const SessaoExpiradaDialog: React.FC<SessaoExpiradaDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sessão Expirada</DialogTitle>
      <DialogContent>
        Sua sessão expirou. Por favor, faça login novamente.
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessaoExpiradaDialog;
