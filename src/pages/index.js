import {
  Box,
  VStack,
  Container,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import Board from "../components/board";
import Controls from "../components/controls";
import { useEffect, useState } from "react";

export default function Home() {
  const [leftPattern, setLeftPattern] = useState([]);
  const [rightPattern, setRightPattern] = useState([]);

  const [playing, setPlaying] = useState(false);
  const [cursor, setCursor] = useState(0);

  return (
    <Box h='100vh' w='100%' backgroundColor='gray.900'>
      <Container maxW='container.xl' h='100%'>
        <VStack h='100%' justify='center' align='normal'>
          <VStack align='normal' spacing={8}>
            <HStack align='baseline'>
              <Heading size='xl' color='white'>
                Drumbot Beat Maker
              </Heading>
              <Text fontSize='xs' mt='auto' color='gray.300'>
                v0.1
              </Text>
            </HStack>

            <Controls playing={playing} setPlaying={setPlaying} />

            <Board
              leftPattern={leftPattern}
              setLeftPattern={setLeftPattern}
              rightPattern={rightPattern}
              setRightPattern={setRightPattern}
            />
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
