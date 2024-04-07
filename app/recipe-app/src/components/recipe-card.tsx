import { Card, CardBody, Stack, Heading, Image, Box } from "@chakra-ui/react";
import "./components.css";
import { Link } from "react-router-dom";

function RecipeCard(data: any) {
  const recipe = data.data;
  return (
    <Link to={"detail/" + recipe.id} state={{ recipe: recipe }}>
      <Card maxW="sm">
        <CardBody>
          <Image src="/recepten-kookboek.jpg" borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{recipe.title}</Heading>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}

export default RecipeCard;
