import { Box, Stack } from "@mui/system";
import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const PolicyPage = () => {
  const { id } = useParams();
  const { name } = useParams();
  const data = ProductContext(ProductArray);
  const policyData = data.policyData;
  const getPolicyDetailsById = data.getPolicyDetailsById;
  console.log(policyData);
  console.log(id, name);
  useEffect(() => {
    getPolicyDetailsById(id);
  }, [id]);
  useEffect(() => {
    window.scroll(0, 0);
  }, [id]);
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          minHeight: "100vh",
          mt: 5,
        }}
      >
        <Stack direction={"column"} spacing={5} textTransform={"uppercase"}>
          <Typography variant="h3" color="white">
            {policyData?.name}
          </Typography>
          <Typography
            variant="body1"
            color="white"
            dangerouslySetInnerHTML={{ __html: policyData?.policy }}
            textTransform={"capitalize"}
          ></Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default PolicyPage;
