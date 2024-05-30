import {
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import "./App.css";
import RecipeCard from "./components/recipe-card";
import { Recipe } from "./interfaces/recipe";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function App() {
  const [filter, setFilter] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/recipes`)
      .then((response) => {
        // handle success
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  return (
    <>
      <Box className="container">
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
              <Button colorScheme="green">Nieuw recept</Button>
            </Link>
          </Box>
        </Flex>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <SimpleGrid
          className="container"
          columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          spacing={5}
        >
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
      )}
    </>
  );
}

export default App;
