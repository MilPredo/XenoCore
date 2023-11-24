import React from "react";
import DynamicTable from "../components/DynamicTable";
import { Button, Flex, Input } from "@chakra-ui/react";
import { FiPlus, FiSearch, FiUserPlus } from "react-icons/fi";
import AddCustomerButton from "../components/AddCustomerButton";

function Customers() {
  return (
    <Flex flex={1} flexDir="column" overflow="hidden">
      <Flex
        p={2}
        bg="secondary.50"
        _dark={{ bg: "secondary.700" }}
        borderRadius="xl"
        m="4"
        gap={2}
      >
        <Flex gap={2} flex={1}>
          <Input
            variant="filled"
            _light={{
              bg: "white",
            }}
            _dark={{
              _hover: { _placeholder: { color: "white", opacity: 0.5 } },
              _focus: { _placeholder: { color: "white", opacity: 0.5 } },
            }}
            placeholder="Search"
          />
        </Flex>
        <Button leftIcon={<FiSearch />} variant="solid" colorScheme="cyan">
          Search
        </Button>
        <AddCustomerButton />
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow='hidden'>
        <DynamicTable
          count={1}
          columns={[
            "First Name",
            "Middle Name",
            "Last Name",
            "Contact Number",
            "Notes",
          ]}
          rows={[
            ["Juan", "Carlos", "Santos", "09171234567", ""],
            ["Maria", "Cristina", "Lazaro", "09281234567", ""],
            [
              "Roberto",
              "Jose",
              "Del Rosario",
              "09391234567",
              "Providing feedback on recent service",
            ],
            ["Emilio", "Andres", "Reyes", "09451234567", ""],
            ["Daniela", "Patricia", "Mendoza", "09561234567", ""],
            ["Sofia", "Rosa", "Villanueva", "09671234567", ""],
            [
              "Mateo",
              "David",
              "Lim",
              "09781234567",
              "Scheduling a follow-up appointment",
            ],
            ["Olivia", "Luz", "Santiago", "09891234567", ""],
            ["Alejandro", "Lu", "Gomez", "09991234567", ""],
            [
              "Emma",
              "Nicole",
              "Ramos",
              "09101234567",
              "Checking the status of an order",
            ],
            [
              "Guillermo",
              "Eduardo",
              "Aquino",
              "09211234567",
              "Interested in special offers",
            ],
            ["Isabella", "Maria", "Castro", "09311234567", ""],
            [
              "Jaime",
              "Tomas",
              "Hernandez",
              "09411234567",
              "Providing feedback on recent purchase",
            ],
            ["Isabela", "Marie", "Lopez", "09511234567", ""],
            ["Eduardo", "Jacob", "Garcia", "09611234567", ""],
            [
              "Mia",
              "Gabriela",
              "Reyes",
              "09711234567",
              "Inquiring about product warranty",
            ],
            ["Miguel", "Willie", "Torres", "09811234567", ""],
            [
              "Sophie",
              "Paige",
              "Collado",
              "09911234567",
              "Updating account information",
            ],
            ["Benjamin", "Carlos", "Rivera", "09121234567", ""],
            [
              "Alden",
              "Jose",
              "Yap",
              "09221234567",
              "Inquiring about shipping details",
            ],
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default Customers;
