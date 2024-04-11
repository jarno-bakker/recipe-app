import {
  Heading,
  Box,
  Input,
  Text,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import "./components.css";
import { useState } from "react";
import { Recipe } from "../interfaces/recipe";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function NewRecept() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [password, setPassword] = useState("");

  const [imageIngredents, setImageIngredents] = useState<
    string | ArrayBuffer | null
  >("");
  const [imageRecipe, setImageRecipe] = useState<string | ArrayBuffer | null>(
    ""
  );

  function addImageIngredients(e: any) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageIngredents(reader.result);
    };
    reader.onerror = (error) => {
      setError(error.toString());
    };
  }

  function addImageRecipe(e: any) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageRecipe(reader.result);
    };
    reader.onerror = (error) => {
      setError(error.toString());
    };
  }

  const save = () => {
    setIsLoading(true);
    let recipe: Recipe = {
      title: title,
      ingredients: ingredients,
      steps: steps,
      image_ingredients: imageIngredents,
      image_recipe: imageRecipe,
      password: password,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/recipes`, recipe)
      .then(() => {
        navigate("/");
      })
      .catch((error: any) => {
        if (error.response.status == 401) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      });
    setIsLoading(false);
  };

  return (
    <>
      <Box className="container">
        <Heading textAlign={"left"} mb={12}>
          Voeg nieuw recept toe
        </Heading>
        <FormControl isRequired>
          <FormLabel>Recept naam</FormLabel>
          <Input
            placeholder="Titel"
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>
        <FormControl isRequired mt={3}>
          <FormLabel>Ingrediënten</FormLabel>
          <Textarea
            placeholder="Ingrediënten"
            onChange={(event) => setIngredients(event.target.value)}
          />
        </FormControl>
        <FormControl isRequired mt={3}>
          <FormLabel>Stappen</FormLabel>
          <Textarea
            placeholder="Stappen"
            onChange={(event) => setSteps(event.target.value)}
          />
        </FormControl>
        <FormControl isRequired mt={3}>
          <FormLabel>Foto van ingrediënten</FormLabel>
          <Input
            accept="image/*"
            type="file"
            onChange={addImageIngredients}
          ></Input>
        </FormControl>
        <FormControl isRequired mt={3}>
          <FormLabel>Foto van recept</FormLabel>
          <Input accept="image/*" type="file" onChange={addImageRecipe}></Input>
        </FormControl>
        <FormControl isRequired mt={3}>
          <FormLabel>Wachtwoord</FormLabel>
          <Input
            placeholder="Wachtwoord"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Link to={"/"}>
          <Button float={"left"} mt={6}>
            Ga terug
          </Button>
        </Link>
        <Button
          colorScheme="green"
          float={"right"}
          mt={6}
          onClick={save}
          disabled={isLoading}
        >
          Opslaan
          {isLoading ? <Spinner ml={2} size={"sm"} /> : null}
        </Button>
        {error !== "" ? <Text color={"red"}>{error}</Text> : null}
      </Box>
    </>
  );
}

export default NewRecept;
