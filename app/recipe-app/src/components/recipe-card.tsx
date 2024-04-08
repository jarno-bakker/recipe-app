import { Card, CardBody, Stack, Heading, Image } from "@chakra-ui/react";
import "./components.css";
import { Link } from "react-router-dom";

function RecipeCard(data: any) {
  const recipe = data.data;
  return (
    <Link to={"detail/" + recipe._id} state={{ recipe: recipe }}>
      <Card maxW="sm">
        <CardBody
          _hover={{ backgroundColor: "#E2E8F0" }}
          transition={"ease-in-out 0.2s"}
        >
          <Image src={recipe.image_recipe} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{recipe.title}</Heading>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}

export default RecipeCard;
