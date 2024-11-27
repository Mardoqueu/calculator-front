import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteOperationHistory, getTransactionHistory } from "../services/api";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { HistoryOperationProps } from "../interfaces/HistoryOperationProps";
import "../styles/styles.css";

export function OperationsHistoryPage() {
  const navigate = useNavigate();
  const [operationsHistory, setOperationsHistory] = useState<
    HistoryOperationProps[]
  >([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOperationId, setSelectedOperationId] = useState<number | null>(
    null
  );

  const getOperationsHistory = async () => {
    const result = await getTransactionHistory();
    if (result) {
      setOperationsHistory(result);
    }
  };

  const handleDeleteOperation = async () => {
    if (selectedOperationId !== null) {
      const success = await deleteOperationHistory(selectedOperationId);
      if (success) {
        setOperationsHistory((prev) =>
          prev.filter((operation) => operation.id !== selectedOperationId)
        );
      }
      setOpenModal(false);
    }
  };

  const handleOpenModal = (operationId: number) => {
    setSelectedOperationId(operationId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOperationId(null);
    setOpenModal(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  useEffect(() => {
    getOperationsHistory();
  }, []);

  return (
    <>
      <Box
        style={{
          display: "flex",
          paddingTop: 40,
          paddingLeft: 40,
          alignSelf: "flex-start",
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/home")}
          className="button"
        >
          Back
        </Button>
      </Box>
      <Container className="container">
        <List className="list">
          {operationsHistory.map((item) => (
            <ListItem key={item?.id} className="listItem">
              <ListItemText
                className="listItemText"
                primary={item?.operationResponse}
              />
              <ListItemText
                className="listItemText"
                secondary={formatDate(item?.date)}
              />
              <ListItemButton
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => handleOpenModal(item.id)}
              >
                <ListItemIcon
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <DeleteIcon color="error" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Container>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this item?
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseModal} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteOperation}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
