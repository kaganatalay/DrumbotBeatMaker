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
import { useEffect, useState } from "react";

export default function Controls(props) {
  return (
    <Box w='100%'>
      <Button
        onClick={() => {
          props.setPlaying(!props.playing);
        }}
      >
        {props.playing ? "Pause" : "Play"}
      </Button>
    </Box>
  );
}
