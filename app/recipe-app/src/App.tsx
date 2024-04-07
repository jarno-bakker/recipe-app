import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import "./App.css";
import Header from "./components/header";
import RecipeCard from "./components/recipe-card";
import { Recipe } from "./interfaces/recipe";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [filter, setFilter] = useState("");

  let recipes: Recipe[] = [
    {
      id: "1",
      title: "Recept 1",
      ingredients: ["Suiker 100 gram", "Melk"],
      steps: [
        "This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.",
        "who love a chic design with a sprinkle of vintage design.",
        "who love a chic design with a sprinkle of vintage design.",
      ],
    },
    {
      id: "2",
      title: "Recept 2",
      ingredients: ["Suiker 100 gram", "Melk"],
      steps: [
        "This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.",
        "who love a chic design with a sprinkle of vintage design.",
        "who love a chic design with a sprinkle of vintage design.",
      ],
    },
    {
      id: "3",
      title: "Recept 3",
      ingredients: ["Suiker 100 gram", "Melk"],
      steps: [
        "This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.",
        "who love a chic design with a sprinkle of vintage design.",
        "who love a chic design with a sprinkle of vintage design.",
      ],
    },
    {
      id: "4",
      title: "Recept 4",
      ingredients: ["Suiker 100 gram", "Melk"],
      steps: [
        "This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and for people who love a chic design with a sprinkle of vintage design.",
        "who love a chic design with a sprinkle of vintage design.",
        "who love a chic design with a sprinkle of vintage design.",
      ],
    },
  ];
  return (
    <>
      <Header />
      <Flex gap={6} justifyContent={"space-between"}>
        <Box w={"90%"}>
          <Input
            mb={5}
            placeholder="Zoek recept"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </Box>
        <Box>
          <Link to={"nieuw-recept"}>
            <Button>Nieuw recept</Button>
          </Link>
        </Box>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={5}>
        {recipes
          .filter(
            (f) =>
              f.title.toLowerCase().includes(filter.toLowerCase()) ||
              filter === ""
          )
          .map((recipe, key) => {
            return <RecipeCard key={key} data={recipe} />;
          })}
      </SimpleGrid>
    </>
  );
}

export default App;
