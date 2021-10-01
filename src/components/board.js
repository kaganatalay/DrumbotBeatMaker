import {
  Box,
  VStack,
  HStack,
  Text,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

export default function Board(props) {
  useEffect(() => {
    let left = [];
    let right = [];
    for (let i = 0; i < 20; i++) {
      left.push([false, false]);
      right.push([false, false]);
    }

    props.setLeftPattern(left);
    props.setRightPattern(right);
  }, []);

  const addSpace = () => {
    let left = props.leftPattern;
    let right = props.rightPattern;

    for (let i = 0; i < 6; i++) {
      left.push([false, false]);
      right.push([false, false]);
    }
    props.setLeftPattern([...left]);
    props.setRightPattern([...right]);
  };

  return (
    <Box w='100%'>
      <VStack align='normal' spacing={1} overflowX='scroll'>
        <HStack spacing={5}>
          <Center px={16} h={20} borderRadius={6} backgroundColor='gray.700'>
            <Text color='white' fontSize='2xl' fontWeight={600}>
              L
            </Text>
          </Center>

          <HStack spacing={1.5} py={0.5}>
            {props.leftPattern.map((active, i) => (
              <Center
                key={i}
                w={20}
                h={20}
                transform={active[1] ? "scale(1.05, 1.05)" : "none"}
                borderRadius={6}
                backgroundColor={active[0] ? "#3498db" : "gray.700"}
                _hover={{
                  backgroundColor: active[0] ? "#5bb4f0" : "gray.600",
                  cursor: "pointer",
                }}
                _active={{ backgroundColor: "gray.500" }}
                transition='background 100ms, transform 70ms'
                onClick={() => {
                  let temp = props.leftPattern;
                  temp[i][0] = !temp[i][0];
                  props.setLeftPattern([...temp]);
                }}
              ></Center>
            ))}
            <IconButton
              w={20}
              h={20}
              borderRadius={6}
              backgroundColor='gray.300'
              icon={<AddIcon color='gray.900' fontSize='lg' />}
              onClick={addSpace}
            ></IconButton>
          </HStack>
        </HStack>

        <HStack spacing={5}>
          <Center px={16} h={20} borderRadius={6} backgroundColor='gray.700'>
            <Text color='white' fontSize='2xl' fontWeight={600}>
              R
            </Text>
          </Center>

          <HStack spacing={1.5} py={0.5}>
            {props.rightPattern.map((active, i) => (
              <Center
                key={i}
                w={20}
                h={20}
                borderRadius={6}
                transform={active[1] ? "scale(1.05, 1.05)" : "none"}
                backgroundColor={active[0] ? "#3498db" : "gray.700"}
                _hover={{
                  backgroundColor: active[0] ? "#5bb4f0" : "gray.600",
                  cursor: "pointer",
                }}
                _active={{ backgroundColor: "gray.500" }}
                transition='background 100ms'
                onClick={() => {
                  let temp = props.rightPattern;
                  temp[i][0] = !temp[i][0];
                  props.setRightPattern([...temp]);
                }}
              ></Center>
            ))}
            <IconButton
              w={20}
              h={20}
              borderRadius={6}
              backgroundColor='gray.300'
              icon={<AddIcon color='gray.900' fontSize='lg' />}
              onClick={addSpace}
            ></IconButton>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}
