import {
  Box,
  VStack,
  Container,
  Heading,
  Text,
  HStack,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import Board from "../components/board";
import { useEffect, useState } from "react";

export default function Controls(props) {
  return (
    <Box w='100%'>
      <HStack spacing={10} justify='space-between'>
        <HStack spacing={4}>
          <Button
            w={32}
            colorScheme={props.playing ? "red" : "green"}
            onClick={() => {
              props.setPlaying(!props.playing);
            }}
          >
            {props.playing ? "Pause" : "Play"}
          </Button>

          <Button
            w={32}
            colorScheme='red'
            onClick={() => {
              let left = [];
              let right = [];
              for (let i = 0; i < 20; i++) {
                left.push([false, false]);
                right.push([false, false]);
              }

              props.setLeftPattern(left);
              props.setRightPattern(right);
            }}
          >
            Clear All
          </Button>
        </HStack>

        <HStack spacing={4}>
          <Slider
            min={30}
            max={480}
            aria-label='slider-ex-1'
            defaultValue={300}
            w={48}
            onChange={(val) => props.setBPM(val)}
          >
            <SliderTrack>
              <SliderFilledTrack bg='#3498db' />
            </SliderTrack>
            <SliderThumb />
          </Slider>

          <HStack spacing={1}>
            <Text color='white' fontSize='lg'>
              {props.BPM}
            </Text>
            <Text color='gray.300' fontSize='xs'>
              BPM
            </Text>
          </HStack>
        </HStack>
      </HStack>
    </Box>
  );
}
