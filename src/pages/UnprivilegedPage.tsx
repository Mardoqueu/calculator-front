import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function UnprivilegedPage() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h3">Unprivileged</Typography>

      <Container>
        <Typography variant="h3">Please log in before attempting to access the service</Typography>

        <Button variant="contained" onClick={() => navigate("/")}>Home</Button>
      </Container>
    </>
  );
}
