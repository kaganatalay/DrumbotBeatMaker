import {
  Box,
  VStack,
  Container,
  Heading,
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import Board from "../components/board";
import Controls from "../components/controls";
import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";

import drumSound from "../../public/drum.mp3";

export default function Home() {
  const [leftPattern, setLeftPattern] = useState([]);
  const [rightPattern, setRightPattern] = useState([]);
  const [BPM, setBPM] = useState(60);

  const [playing, setPlaying] = useState(false);

  const cursor = useRef(0);
  const playerHandle = useRef(null);

  const [playLeftDrum] = useSound(drumSound);
  const [playRightDrum] = useSound(drumSound);

  useEffect(() => {
    if (playing) {
      playerHandle.current = setInterval(() => {
        let l = leftPattern;
        let r = rightPattern;
        l[cursor.current][1] = true;
        r[cursor.current][1] = true;
        setLeftPattern([...l]);
        setRightPattern([...r]);

        if (leftPattern[cursor.current][0]) {
          playLeftDrum();
        }

        if (rightPattern[cursor.current][0]) {
          playRightDrum();
        }

        l[cursor.current][1] = false;
        r[cursor.current][1] = false;

        if (cursor.current < leftPattern.length - 1) {
          cursor.current++;
        } else {
          cursor.current = 0;
        }
      }, (60 / BPM) * 1000);
    } else {
      cursor.current = 0;
      clearInterval(playerHandle.current);
    }
  }, [playing]);

  return (
    <Box h='100vh' w='100%' backgroundColor='gray.900'>
      <Container maxW='container.xl' h='100%'>
        <VStack h='100%' justify='center' align='normal'>
          <VStack align='normal' spacing={12}>
            <HStack align='baseline'>
              <Heading size='xl' color='white'>
                Drumbot Beat Maker
              </Heading>
              <Text fontSize='xs' mt='auto' color='gray.300'>
                v0.4
              </Text>
            </HStack>

            <Controls
              setLeftPattern={setLeftPattern}
              setRightPattern={setRightPattern}
              playing={playing}
              setPlaying={setPlaying}
              BPM={BPM}
              setBPM={setBPM}
            />

            <Board
              leftPattern={leftPattern}
              setLeftPattern={setLeftPattern}
              rightPattern={rightPattern}
              setRightPattern={setRightPattern}
            />

            <Button colorScheme='blue' w={32}>
              Export
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
