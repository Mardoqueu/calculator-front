import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Typography variant="h3">Please come home</Typography>

        <Button variant="contained" onClick={() => navigate("/home")}>Home</Button>
      </Container>
    </>
  );
}
