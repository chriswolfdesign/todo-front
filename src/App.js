import { Box, Typography } from "@mui/material";

function App() {
  return (
    <Box
      height="85vh"
      marginY={3}
      marginX={2}
      display="flex"
      flexDirection="column"
      borderRadius={2}
      padding={3}
      sx={{
        backgroundColor: "white",
      }}
    >
      <Typography>Foobar</Typography>
    </Box>
  );
}

export default App;
