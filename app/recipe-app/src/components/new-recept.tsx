import {
  Heading,
  Box,
  Input,
  Text,
  FormControl,
  FormLabel,
  Button,
  Textarea,
} from "@chakra-ui/react";
import "./components.css";
import { useState } from "react";
import { Recipe } from "../interfaces/recipe";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function NewRecept() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
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

  const addTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const addPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const addIngredients = (e: any) => {
    setIngredients(e.target.value);
  };

  const addSteps = (e: any) => {
    setSteps(e.target.value);
  };

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
    let recipe: Recipe = {
      title: title,
      ingredients: ingredients,
      steps: steps,
      image_ingredients_id: imageIngredents,
      image_recipe_id: imageRecipe,
      password: password,
    };

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/recipes`, recipe)
      .then((response) => {
        console.log(response);
        navigate("/" + response.data._id);
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <>
      <Box className="container">
        <Heading textAlign={"left"} mb={12}>
          Voeg nieuw recept toe
        </Heading>
        <FormControl isRequired>
          <FormLabel>Recept naam</FormLabel>
          <Input placeholder="Titel" onChange={addTitle} />
        </FormControl>

        <FormControl isRequired mt={3}>
          <FormLabel>Ingrediënten</FormLabel>
          <Textarea placeholder="Ingrediënten" onChange={addIngredients} />
        </FormControl>

        <FormControl isRequired mt={3}>
          <FormLabel>Stappen</FormLabel>
          <Textarea placeholder="Stappen" onChange={addSteps} />
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
            onChange={addPassword}
          />
        </FormControl>

        <Link to={"/"}>
          <Button float={"left"} mt={6}>
            Ga terug
          </Button>
        </Link>

        <Button colorScheme="green" float={"right"} mt={6} onClick={save}>
          Opslaan
        </Button>

        {error !== "" ? <Text color={"red"}>{error}</Text> : null}
      </Box>
    </>
  );
}

export default NewRecept;
