import {
  Box,
  VStack,
  Container,
  Heading,
  Text,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Code,
  useDisclosure,
} from "@chakra-ui/react";
import Board from "../components/board";
import Controls from "../components/controls";
import { useEffect, useState, useRef } from "react";
import useSound from "use-sound";

import drumSound from "../../public/drum.mp3";

export default function Home() {
  const [leftPattern, setLeftPattern] = useState([]);
  const [rightPattern, setRightPattern] = useState([]);
  const [BPM, setBPM] = useState(300);

  const [playing, setPlaying] = useState(false);

  const cursor = useRef(0);
  const playerHandle = useRef(null);

  const [playLeftDrum] = useSound(drumSound);
  const [playRightDrum] = useSound(drumSound);

  const [code, setCode] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const exportCode = () => {
    let wl = 0;
    let wr = 0;

    for (let i = 0; i < leftPattern.length; i++) {
      if (leftPattern[i][0]) {
        wl = i + 1;
      }
    }

    for (let i = 0; i < rightPattern.length; i++) {
      if (rightPattern[i][0]) {
        wr = i + 1;
      }
    }

    let len = Math.max(wl, wr);
    let wait = (60 / BPM).toFixed(3);
    let temp = ``;

    for (let i = 0; i < len; i++) {
      if (leftPattern[i][0] && rightPattern[i][0]) {
        temp += "new HitBoth(d),";
        temp += `new WaitCommand(${wait}),`;
      } else if (leftPattern[i][0]) {
        temp += "new HitLeft(d),";
        temp += `new WaitCommand(${wait}),`;
      } else if (rightPattern[i][0]) {
        temp += "new HitRight(d),";
        temp += `new WaitCommand(${wait}),`;
      } else {
        temp += `new WaitCommand(${wait}),`;
      }
    }

    setCode(temp.slice(0, -1));
  };

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

            <Button
              colorScheme='blue'
              w={32}
              onClick={() => {
                onOpen();
                exportCode();
              }}
            >
              Export
            </Button>

            <Modal
              isOpen={isOpen}
              onClose={onClose}
              scrollBehavior='inside'
              size='2xl'
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Exported Code</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Code px={3} py={4}>
                    {code}
                  </Code>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
