import {
  Heading,
  Box,
  Flex,
  Text,
  Button,
  Image,
  useDisclosure,
  Modal,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import "./components.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { RemoveRecipeModal } from "./remove-recipe.modal";

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
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const { recipe } = getData(location);

  const removeRecipe = (id: string) => {
    axios
      .delete(
        `${import.meta.env.VITE_BASE_URL}/recipes/${id}?password=${password}`
      )
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error: any) => {
        if (error.response.status == 401) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      });
  };

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
          <Button mt={12} colorScheme="red" float={"left"} onClick={onOpen}>
            Verwijder
          </Button>
          <Link to={"/"}>
            <Button mt={12} float={"right"}>
              Ga terug
            </Button>
          </Link>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zeker dat je wilt verwijderen?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Wachtwoord</FormLabel>
              <Input
                placeholder="Wachtwoord"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
            <Text color={"red"}>{error}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => removeRecipe(recipe._id)}
            >
              Verwijder
            </Button>
            <Button onClick={onClose}>Nee, behouden</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeDetail;
