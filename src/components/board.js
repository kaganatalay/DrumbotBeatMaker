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
      left.push(false);
      right.push(false);
    }

    props.setLeftPattern(left);
    props.setRightPattern(right);
  }, []);

  return (
    <Box w='100%'>
      <VStack align='normal' spacing={2} overflowX='scroll'>
        <HStack spacing={5}>
          <Center px={16} h={20} borderRadius={6} backgroundColor='gray.700'>
            <Text color='white' fontSize='2xl' fontWeight={600}>
              L
            </Text>
          </Center>

          <HStack spacing={1.5}>
            {props.leftPattern.map((active, i) => (
              <Center
                key={i}
                w={20}
                h={20}
                borderRadius={6}
                backgroundColor={active ? "#3498db" : "gray.700"}
                _hover={{
                  backgroundColor: active ? "#5bb4f0" : "gray.600",
                  cursor: "pointer",
                }}
                _active={{ backgroundColor: "gray.500" }}
                transition='background 100ms'
                onClick={() => {
                  let temp = props.leftPattern;
                  temp[i] = !temp[i];
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
              onClick={() => {
                let temp = props.leftPattern;
                for (let i = 0; i < 6; i++) {
                  temp.push(false);
                }
                props.setLeftPattern([...temp]);
              }}
            ></IconButton>
          </HStack>
        </HStack>

        <HStack spacing={5}>
          <Center px={16} h={20} borderRadius={6} backgroundColor='gray.700'>
            <Text color='white' fontSize='2xl' fontWeight={600}>
              R
            </Text>
          </Center>

          <HStack spacing={1.5}>
            {props.rightPattern.map((active, i) => (
              <Center
                key={i}
                w={20}
                h={20}
                borderRadius={6}
                backgroundColor={active ? "#3498db" : "gray.700"}
                _hover={{
                  backgroundColor: active ? "#5bb4f0" : "gray.600",
                  cursor: "pointer",
                }}
                _active={{ backgroundColor: "gray.500" }}
                transition='background 100ms'
                onClick={() => {
                  let temp = props.rightPattern;
                  temp[i] = !temp[i];
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
              onClick={() => {
                let temp = props.rightPattern;
                for (let i = 0; i < 6; i++) {
                  temp.push(false);
                }
                props.setRightPattern([...temp]);
              }}
            ></IconButton>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
}
