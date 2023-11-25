import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [refreshed, setRefreshed] = useState(false);
  useEffect(() => {
    console.log("hallo")
    if (refreshed) {
      setRefreshed(false);
    } else {
      setRefreshed(true);
      navigate("");
    }
  }, []);
  return (
    <Flex flex={1} flexDir="column" p={4}>
      <Grid templateRows="repeat(5, 1fr)" templateColumns="repeat(3, 1fr)" flex={1} gap={6}>
        <GridItem rowSpan={1} colSpan={1} bg="secondary.700" _light={{ bg: "secondary.50" }} borderRadius="xl" p={2}>
          <Flex flexDir="column" h="100%" align="center" justify="center">
            <Text>PRODUCTS</Text>
            <Heading>21</Heading>
          </Flex>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="secondary.700" _light={{ bg: "secondary.50" }} borderRadius="xl" p={2}>
          <Flex flexDir="column" h="100%" align="center" justify="center">
            <Text>TOTAL INVENTORY VALUE</Text>
            <Heading>
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(7000000)}
            </Heading>
          </Flex>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1} bg="secondary.700" _light={{ bg: "secondary.50" }} borderRadius="xl" p={2}>
          {" "}
          <Flex flexDir="column" h="100%" align="center" justify="center">
            <Text>TOTAL INVENTORY COST</Text>
            <Heading>
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(3000000)}
            </Heading>
          </Flex>
        </GridItem>
        <GridItem rowSpan={2} colSpan={1} bg="secondary.700" _light={{ bg: "secondary.50" }} borderRadius="xl" p={2}>
          <Center h="100%" w="100%">
            <Box w="85%" aspectRatio={16 / 9}>
              <Chart
                options={{
                  chart: {
                    type: "pie",
                  },
                  labels: ["Remitted", "Un-Remitted"],

                  colors: ["#6640BF", "#007F99"],
                  dataLabels: {
                    enabled: true,
                  },
                  stroke: {
                    show: false,
                  },
                  legend: {
                    labels: {
                      colors: colorMode === "dark" ? "white" : "black", // Set the font color of the legend
                    },
                  },
                }}
                series={[300, 150]}
                type="pie"
              />
            </Box>
          </Center>
        </GridItem>
        <GridItem rowSpan={4} colSpan={2} bg="secondary.700" _light={{ bg: "secondary.50" }} borderRadius="xl" p={2}>
          <Chart
            options={{
              chart: {
                type: "bar",
              },
              grid: {
                yaxis: { lines: { show: false } },
              },
              plotOptions: {
                bar: {
                  borderRadius: 4,
                  horizontal: true,
                },
              },
              dataLabels: {
                enabled: true,
              },
              xaxis: {
                categories: ["Paracetamol", "Cetirizine", "Neozef", "Bonamine", "Ibuprofen"],
                labels: {
                  style: {
                    colors: colorMode === "dark" ? "white" : "black",
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: colorMode === "dark" ? "white" : "black",
                  },
                },
              },
              colors: ["#6640BF"],
              tooltip: {
                enabled: false,
              },
              title: {
                text: "TOP 5 SOLD PRODUCTS",
                align: "center",
                style: {
                  color: colorMode === "dark" ? "white" : "black", // Set the font color of the title
                },
              },
            }}
            series={[
              {
                data: [400, 300, 250, 120, 70],
              },
            ]}
            type="bar"
          />
        </GridItem>
        <GridItem rowSpan={2} colSpan={1} bg="secondary.700" _light={{ bg: "secondary.50" }} borderRadius="xl" p={2}>
          <Center h="100%" w="100%">
            <Box w="85%">
              <Chart
                options={{
                  chart: {
                    type: "pie",
                  },
                  labels: ["In-Stock", "Low-Stock", "No Stock"],

                  colors: [
                    colorMode === "dark" ? "rgb(0, 200, 0)" : "rgb(100, 200, 100)",
                    "	rgb(200, 200, 0)",
                    "rgb(230, 50, 50)",
                  ],
                  dataLabels: {
                    enabled: true,
                  },
                  stroke: {
                    show: false,
                  },
                  legend: {
                    labels: {
                      colors: colorMode === "dark" ? "white" : "black", // Set the font color of the legend
                    },
                  },
                }}
                series={[450, 30, 20]}
                type="pie"
              />
            </Box>
          </Center>
        </GridItem>
      </Grid>
      {/* <Grid templateRows="repeat(4, 1fr)" templateColumns="repeat(3, 1fr)" h='0'>
        <GridItem rowSpan={1} colSpan={3}>
          <StatGroup>
            <Stat
              bg="secondary.700"
              _light={{ bg: "secondary.50" }}
              p={2}
              m={2}
              borderRadius="xl"
            >
              <StatLabel>PRODUCTS</StatLabel>
              <StatNumber>21</StatNumber>
            </Stat>

            <Stat
              bg="secondary.700"
              _light={{ bg: "secondary.50" }}
              p={2}
              m={2}
              borderRadius="xl"
            >
              <StatLabel>CURRENT INVENTORY VALUE</StatLabel>
              <StatNumber>
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(7000000)}
              </StatNumber>
            </Stat>
            <Stat
              bg="secondary.700"
              _light={{ bg: "secondary.50" }}
              p={2}
              m={2}
              borderRadius="xl"
            >
              <StatLabel>CURRENT INVENTORY COST</StatLabel>
              <StatNumber>
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(3000000)}
              </StatNumber>
            </Stat>
          </StatGroup>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Flex
            flex={1}
            flexDir={"column"}
            bg="secondary.700"
            _light={{ bg: "secondary.50" }}
            p={2}
            m={2}
            borderRadius="xl"
          >
            <Chart
              options={{
                chart: {
                  type: "pie",
                },
                labels: ["Remitted", "Un-Remitted"],

                colors: ["#6640BF", "#007F99"],
                dataLabels: {
                  enabled: true,
                },
                stroke: {
                  show: false,
                },
                legend: {
                  labels: {
                    colors: colorMode === "dark" ? "white" : "black", // Set the font color of the legend
                  },
                },
              }}
              series={[300, 150]}
              type="pie"
            />
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={2}
          area={"bar"}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
        >
          <Flex flex={1} flexDir={"column"} p={2}>
            <Chart
              options={{
                chart: {
                  type: "bar",
                },
                grid: {
                  yaxis: { lines: { show: false } },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    horizontal: true,
                  },
                },
                dataLabels: {
                  enabled: true,
                },
                xaxis: {
                  categories: [
                    "Paracetamol",
                    "Cetirizine",
                    "Neozef",
                    "Bonamine",
                    "Ibuprofen",
                  ],
                  labels: {
                    style: {
                      colors: colorMode === "dark" ? "white" : "black",
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: colorMode === "dark" ? "white" : "black",
                    },
                  },
                },
                colors: ["#6640BF"],
                tooltip: {
                  enabled: false,
                },
                title: {
                  text: "TOP 5 SOLD PRODUCTS",
                  align: "center",
                  style: {
                    color: colorMode === "dark" ? "white" : "black", // Set the font color of the title
                  },
                },
              }}
              series={[
                {
                  data: [400, 300, 250, 120, 70],
                },
              ]}
              type="bar"
            />
          </Flex>
        </GridItem>{" "}
        <GridItem rowSpan={1} colSpan={1}>
          <Flex
            flex={1}
            flexDir={"column"}
            bg="secondary.700"
            _light={{ bg: "secondary.50" }}
            p={2}
            m={2}
            borderRadius="xl"
          >
            <Chart
              options={{
                chart: {
                  type: "pie",
                },
                labels: ["In-Stock", "Low-Stock", "No Stock"],

                colors: [
                  colorMode === "dark"
                    ? "rgb(0, 200, 0)"
                    : "rgb(100, 200, 100)",
                  "	rgb(200, 200, 0)",
                  "rgb(230, 50, 50)",
                ],
                dataLabels: {
                  enabled: true,
                },
                stroke: {
                  show: false,
                },
                legend: {
                  labels: {
                    colors: colorMode === "dark" ? "white" : "black", // Set the font color of the legend
                  },
                },
              }}
              series={[450, 30, 20]}
              type="pie"
            />
          </Flex>
        </GridItem>
      </Grid> */}
    </Flex>
  );
}

export default Dashboard;
