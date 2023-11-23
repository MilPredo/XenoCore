import { Center, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Chart from "react-apexcharts";
function Statistics() {
  return (
    <Flex flex={1} flexDir="column" p={4}>
      <Grid
        templateRows="repeat(4, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={2}
      >
        <GridItem flex={1} rowSpan={1} colSpan={2}>
          <Flex
            h="100%"
            p={2}
            flexDir={"column"}
            gap={4}
            justify="space-evenly"
          >
            <Flex
              p={2}
              align="center"
              borderRadius="xl"
              flexDir={"column"}
              bg="secondary.700"
            >
              <Heading size="md">PRODUCTS</Heading>
              <Text fontWeight="bold">500</Text>
            </Flex>
            <Flex
              p={2}
              align="center"
              borderRadius="xl"
              flexDir={"column"}
              bg="secondary.700"
            >
              <Heading size="md">CURRENT INVENTORY VALUE</Heading>
              <Text fontWeight="bold">
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(7000000)}
              </Text>
            </Flex>
            <Flex
              p={2}
              align="center"
              borderRadius="xl"
              flexDir={"column"}
              bg="secondary.700"
            >
              <Heading size="md">CURRENT INVENTORY COST</Heading>
              <Text fontWeight="bold">
                {new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(3000000)}
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} bg="secondary.700" borderRadius="xl">
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
                      colors: "white",
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: "white",
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
                    color: "white", // Set the font color of the title
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
        </GridItem>

        <GridItem flex={1} rowSpan={1} colSpan={1}>
          <Flex flex={1} flexDir={"column"}>
            <Chart
              options={{
                chart: {
                  type: "pie",
                },
                labels: ["In-Stock", "Low-Stock", "No Stock"],

                colors: ["green", "orange", "red"],
                dataLabels: {
                  enabled: true,
                },
                stroke: {
                  show: false,
                },
                legend: {
                  labels: {
                    colors: "white", // Set the font color of the legend
                  },
                },
              }}
              series={[450, 30, 20]}
              type="pie"
            />
          </Flex>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Flex flex={1} flexDir={"column"}>
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
                    colors: "white", // Set the font color of the legend
                  },
                },
              }}
              series={[300, 150]}
              type="pie"
            />
          </Flex>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2}>
          <Flex flex={1} flexDir={"column"}>
            asd
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default Statistics;
