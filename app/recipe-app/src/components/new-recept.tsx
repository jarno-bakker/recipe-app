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

  const [imageIngredents, setImageIngredents] = useState<File>();
  const [imageRecipe, setImageRecipe] = useState<File>();

  function addImageIngredients(event: React.FormEvent) {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      setImageIngredents(files[0]);
    }
  }

  function addImageRecipe(event: React.FormEvent) {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      setImageRecipe(files[0]);
    }
  }

  const save = () => {
    setError("");
    setIsLoading(true);
    console.log(import.meta.env.VITE_PASSWORD);

    if (password != import.meta.env.VITE_PASSWORD) {
      setError("Wachtwoord verkeerd!");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("steps", steps);
    formData.append("image_ingredients", imageIngredents as File);
    formData.append("image_recipe", imageRecipe as File);
    formData.append("password", password);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/recipes`, formData)
      .then(() => {
        navigate("/");
        setIsLoading(false);
      })
      .catch((error: any) => {
        if (error.response.status == 401) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
        setIsLoading(false);
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
