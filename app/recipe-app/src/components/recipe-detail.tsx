import { Heading, Box, Flex, Text, Button, Image } from "@chakra-ui/react";
import "./components.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function charactersAfterLastSlash(str: string) {
  const lastIndex = str.lastIndexOf("/");
  return str.substring(lastIndex + 1);
}

function getData(location: any) {
  if (location.state != null) {
    return location.state;
  } else {
    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/recipes/${charactersAfterLastSlash(
          location.pathname
        )}`
      )
      .then((response) => {
        // handle success
        return response.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }
}

function RecipeDetail() {
  const location = useLocation();
  const { recipe } = getData(location);
  return (
    <>
      <Image
        src={recipe.image_recipe}
        w="100vw"
        h={{ xl: "400px", md: "300px", base: "200px" }}
        objectFit="cover"
      />
      <Box className="container">
        <Heading size="2xl" pt={3} pb={12}>
          {recipe.title}
        </Heading>
        <Flex gap={3} flexDirection={{ base: "column", md: "row" }}>
          <Box
            w={{ base: "100%", md: "50%" }}
            bg={"#fafafa"}
            borderRadius={"10px"}
            p={3}
            pl={8}
            textAlign={"left"}
          >
            <Heading pb={5}>Ingredienten</Heading>
            <Text whiteSpace={"pre-line"}>{recipe.ingredients}</Text>
          </Box>
          <Box w={{ base: "100%", md: "50%" }}>
            <Image
              src={recipe.image_ingredients}
              alt={"ha"}
              borderRadius={"10px"}
            />
          </Box>
        </Flex>
        <Box
          w={"100%"}
          bg={"#fafafa"}
          borderRadius={"10px"}
          mt={6}
          p={3}
          pl={8}
          textAlign={"left"}
        >
          <Heading pb={5}>Stappen</Heading>
          <Text whiteSpace={"pre-line"}>{recipe.steps}</Text>
        </Box>

        <Box>
          <Link to={"/"}>
            <Button mt={12} float={"right"}>
              Ga terug
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default RecipeDetail;
