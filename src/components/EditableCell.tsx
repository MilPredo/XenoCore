import { Box, Button, ButtonGroup, Flex, Input, Text, useOutsideClick } from "@chakra-ui/react";
import React, { ChangeEvent, FocusEventHandler, useEffect, useRef, useState } from "react";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";

function EditableCell({
  defaultValue = "0.00",
  type = "currency",
  onSave,
}: {
  defaultValue: string | number | undefined;
  type?: "currency" | "text" | "number";
  onSave?: (val: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputAmount, setInputAmount] = useState(defaultValue);
  const [trueAmount, setTrueAmount] = useState("");
  const editElement = useRef(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (type === "number") return setInputAmount(e.target.value.replace(/[^0-9]/g, ""));
    let [, fraction = ""] = value.split(".");
    if (fraction.length > 2 && type === "currency") return;
    setInputAmount(value);
  };
  const handleInputSave = () => {
    if (type === "currency") {
      let formattedVal = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(
        typeof inputAmount === "string"
          ? parseFloat(inputAmount ? inputAmount : "0.00")
          : inputAmount
          ? inputAmount
          : 0.0
      );
      setTrueAmount(formattedVal);
    }

    if (type === "text") {
      setTrueAmount(inputAmount + "");
    }

    if (type === "number") {
      if (typeof inputAmount === "string") {
        let val = parseInt(inputAmount);
        setTrueAmount(Number.isNaN(val) ? "0" : val + "");
      } else {
        setTrueAmount(inputAmount.toString());
      }
    }

    setIsEditing(false);
  };
  useEffect(() => {
    if (isEditing) {
      if (type === "text") {
        setInputAmount(trueAmount + "");
      }
      if (type === "currency") {
        setInputAmount(parseFloat(trueAmount.replace(/₱/, "")));
      }
      if (type === "number") {
        setInputAmount(parseInt(trueAmount) + "");
      }
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  useEffect(() => {
    setInputAmount(inputAmount + "");
  }, [trueAmount]);

  const doEdit = () => {
    setInputAmount(type === "text" ? trueAmount : trueAmount.replace(/[^\d.]/g, ""));
    setIsEditing(true);
  };
  const cancelEdit = () => {
    setInputAmount(type === "text" ? trueAmount : trueAmount.replace(/[^\d.]/g, ""));
    setIsEditing(false);
  };

  useOutsideClick({
    ref: editElement,
    handler: handleInputSave,
  });

  useEffect(() => {
    handleInputSave();
  }, []);

  useEffect(() => {
    if (!onSave) return;
    if (!(type === "text")) {
      onSave(trueAmount.replace(/₱/, ""));
    } else {
      onSave(trueAmount);
    }
  }, [trueAmount]);

  return (
    <Box>
      <Flex gap={2} ref={editElement} align="center">
        <Text hidden={isEditing}>{trueAmount}</Text>
        <Input
          ref={inputRef}
          size="xs"
          hidden={!isEditing}
          type={type === "currency" ? "number" : "text"}
          inputMode={type === "currency" ? "decimal" : "numeric"}
          step={type === "currency" ? 0.01 : type === "number" ? 1 : undefined} // Enforce 2 decimal places
          onChange={handleInputChange}
          value={inputAmount}
          onKeyDown={
            type === "number" ? (evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault() : undefined
          }
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
