import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Box,
  InputBase,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ListAltTwoTone } from "@mui/icons-material";
import { Calculator } from "../components/Calculator";
import { useNavigate } from "react-router-dom";
import { currentBalance, generateRandomString } from "../services/api";

export function HomePage() {
  const navigate = useNavigate();
  const [currentBalanceValue, setCurrentBalanceValue] = useState(0);
  const [randomString, setRandomString] = useState("");
  const [inputValue, setInputValue] = useState("");

  const getRandomString = async () => {
    const result = await generateRandomString();

    if (result) {
      setRandomString(result);
      return;
    }

    return;
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    const getCurrentBalance = async () => {
      const balance = await currentBalance();
      setCurrentBalanceValue(balance);
    };
    getCurrentBalance();
  }, [randomString, inputValue]);

  return (
    <>
      <Container style={{ flexDirection: "column" }}>
        <Box
          style={{
            display: "flex",
            width: "100%",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <InputBase
            sx={{
              bgcolor: "#FFFFFF",
              border: "1px solid #cccccc",
              borderRadius: 2,
              padding: 1,
              height: 46,
              color: "#333",
              pointerEvents: "none",
              userSelect: "none",
              fontWeight: 600,
              fontSize: 24,
              mb: 2,
              maxWidth: 200,
            }}
            value={currentBalanceValue}
            size="medium"
            inputProps={{ style: { textAlign: "center" } }}
          />
          <Tooltip title="Operations history">
            <IconButton
              aria-label="listoperations"
              color="primary"
              style={{ maxHeight: 46, borderRadius: 10 }}
              onClick={() => navigate("/operations-history")}
            >
              <ListAltTwoTone />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            style={{ maxHeight: 46 }}
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Calculator onInputChange={handleInputChange} />
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            marginTop: 20,
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              maxWidth: 180,
            }}
          >
            <Button
              variant="contained"
              onClick={getRandomString}
              style={{ maxWidth: 180 }}
            >
              Generate string
            </Button>
          </Box>
        </Box>
      </Container>
      <InputBase
        sx={{
          bgcolor: "#FFFFFF",
          border: "1px solid #cccccc",
          borderRadius: 2,
          padding: 1,
          height: 46,
          color: "#333",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 600,
          maxWidth: 400,
          fontSize: 18,
          mt: 2,
          mb: 2,
        }}
        inputProps={{ style: { textAlign: "center" } }}
        value={randomString}
        fullWidth
      />
    </>
  );
}
