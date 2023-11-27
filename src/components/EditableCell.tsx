import { Box, Button, ButtonGroup, Flex, Input, Text, useOutsideClick } from "@chakra-ui/react";
import React, { ChangeEvent, FocusEventHandler, useEffect, useRef, useState } from "react";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";

function EditableCell({
  defaultValue = "0.00",
  type = "currency",
}: {
  defaultValue: string | number | undefined;
  type?: "currency" | "text" | "number";
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputAmount, setInputAmount] = useState(defaultValue);
  const [trueAmount, setTrueAmount] = useState("");
  const editElement = useRef(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let [, fraction = ""] = value.split(".");
    if (fraction.length > 2) return;
    setInputAmount(value);
  };
  const handleInputSave = () => {
    setTrueAmount(
      new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(
        typeof inputAmount === "string"
          ? parseFloat(inputAmount ? inputAmount : "0.00")
          : inputAmount
          ? inputAmount
          : 0.0
      )
    );
    setIsEditing(false);
  };
  useEffect(() => {
    if (isEditing) {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing]);
  const doEdit = () => {
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setInputAmount(trueAmount.replace(/[^\d.]/g, ""));
    setIsEditing(false);
  };

  useOutsideClick({
    ref: editElement,
    handler: handleInputSave,
  });

  useEffect(() => {
    handleInputSave();
  }, []);

  return (
    <Box>
      <Flex gap={2} ref={editElement} align="center">
        <Text hidden={isEditing}>{trueAmount}</Text>
        <Input
          ref={inputRef}
          size="xs"
          hidden={!isEditing}
          type="number"
          inputMode="decimal"
          step={0.01} // Enforce 2 decimal places
          placeholder="Enter amount"
          onChange={handleInputChange}
          value={inputAmount}
        />
        <Box
          hidden={isEditing}
          onClick={doEdit}
          as="button"
          opacity="0.5"
          _hover={{ opacity: "1" }}
          transitionDuration="0.25s"
          p={1}
        >
          <FiEdit m={0} />
        </Box>
        <ButtonGroup size="xs" isAttached variant="outline" hidden={!isEditing}>
          <Button onClick={handleInputSave} m="0" p="0" variant="solid" colorScheme="green">
            <FiCheck />
          </Button>
          <Button onClick={cancelEdit} m="0" p="0" variant="solid" colorScheme="red">
            <FiX />
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default EditableCell;
