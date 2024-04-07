import {
  Heading,
  Box,
  Flex,
  OrderedList,
  ListItem,
  UnorderedList,
  Button,
} from "@chakra-ui/react";
import "./components.css";
import { Link, useLocation } from "react-router-dom";

function RecipeDetail() {
  const location = useLocation();
  const { recipe } = location.state;
  console.log(recipe);
  return (
    <>
      <Box
        w="100%"
        h={{ xl: "400px", md: "300px", base: "200px" }}
        bgImage={"/recepten-kookboek.jpg"}
        bgSize={"cover"}
        bgPos={"center"}
        rounded={"10px"}
      ></Box>
      <Box>
        <Heading size="2xl" pt={6} pb={6}>
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
            <UnorderedList>
              {recipe.ingredients.map((ingredient: string, key: number) => {
                return <ListItem key={key}>{ingredient}</ListItem>;
              })}
            </UnorderedList>
          </Box>
          <Box
            w={{ base: "100%", md: "50%" }}
            bg={"#fafafa"}
            borderRadius={"10px"}
            p={3}
            pl={8}
            textAlign={"left"}
          >
            <Heading pb={5}>Stappen</Heading>
            <OrderedList>
              {recipe.steps.map((step: string, key: number) => {
                return <ListItem key={key}>{step}</ListItem>;
              })}{" "}
            </OrderedList>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Link to={"/"}>
          <Button mt={12} float={"right"}>
            Ga terug
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default RecipeDetail;
