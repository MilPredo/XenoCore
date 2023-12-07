import { Box, Button, ButtonGroup, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiCheck, FiMinus, FiPlus, FiX } from "react-icons/fi";

function QuantityInput({ max = 100, onChange = (val: string) => {} }) {
  const [quantity, setQuantity] = useState("1");
  const [previous, setPreviousQuantity] = useState("1");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isX, setIsX] = useState(false);

  useEffect(() => {
    console.log(quantity.length);
    if (Number.parseInt(quantity) < 1) {
      setIsInvalid(true);
    } else if (Number.parseInt(quantity) > max) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    onChange(quantity);
  }, [quantity]);

  useEffect(() => {
    if (isFocus) {
      setPreviousQuantity(quantity);
    }
  }, [isFocus]);

  const doIncrement = () => {
    console.log("ahllo");
    let asNum = Number.parseInt(quantity) + 1;

    asNum = asNum > max ? max : asNum;
    setQuantity(asNum.toString());
  };
  const doDecrement = () => {
    let asNum = Number.parseInt(quantity) - 1;
    asNum = asNum <= 0 ? 1 : asNum;
    setQuantity(asNum.toString());
  };
  const handleInputChange = (val: string) => {
    let asNum = Number.parseInt(val.replace(/[^0-9]/g, ""));
    if (isNaN(asNum)) {
      asNum = 1;
    }
    // asNum = asNum >= max ? max : asNum;
    // asNum = asNum <= 0 ? 1 : asNum;
    setQuantity(asNum.toString());
  };
  const handleValidate = () => {
    let asNum = Number.parseInt(quantity);
    asNum = asNum >= max ? max : asNum;
    asNum = asNum <= 0 ? 1 : asNum;
    asNum = Number.isNaN(asNum) ? 1 : asNum;
    setQuantity(asNum.toString());
    if (!isX) setIsFocus(false);
  };

  const revertChanges = () => {
    setQuantity(previous);
    setIsFocus(false);
  };
  return (
    <Flex mx={2}>
      <ButtonGroup size="xs" isAttached variant="outline">
        {isFocus && (
          <Button
            onMouseOut={() => setIsX(false)}
            onMouseOver={() => setIsX(true)}
            disabled={!isFocus}
            onClick={revertChanges}
            m="0"
            p="0"
            variant="solid"
            colorScheme="red"
          >
            <FiX />
          </Button>
        )}
        {!isFocus && (
          <Button disabled={isFocus} onClick={doDecrement} m="0" p="0" variant="solid" colorScheme="red">
            <FiMinus />
          </Button>
        )}
        <Input
          textColor={isInvalid ? "red" : ""}
          size="xs"
          type="number"
          inputMode="numeric"
          w={`${quantity.length > 6 ? 9 : quantity.length + 3}ch`}
          value={quantity}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleValidate}
          onFocus={() => setIsFocus(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleValidate();
            }
          }}
        />
        {isFocus && (
          <Button
            disabled={!isFocus || isInvalid}
            onClick={() => {
              handleValidate();
              setIsFocus(false);
            }}
            m="0"
            p="0"
            variant="solid"
            colorScheme="green"
          >
            <FiCheck />
          </Button>
        )}
        {!isFocus && (
          <Button disabled={isFocus} onClick={doIncrement} m="0" p="0" variant="solid" colorScheme="green">
            <FiPlus />
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  );
}

export default QuantityInput;
