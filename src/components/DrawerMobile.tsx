import { Drawer, DrawerBody, DrawerContent, DrawerHeader, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";

function DrawerMobile() {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => setIsOpen(false);
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      returnFocusOnClose={false}
      onOverlayClick={onClose}
      size="full"
    >
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerMobile;
