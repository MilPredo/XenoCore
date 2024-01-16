import {
  Avatar,
  Box,
  Center,
  ChakraComponent,
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
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

interface TopSales {
  id: number;
  product_name: string;
  category: string;
  total_sale_quantity: number;
}
function Dashboard() {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [refreshed, setRefreshed] = useState(false);

  const [pieSize, setPieSize] = useState({ width: 0, height: 0 });
  const [graphSize, setGraphSize] = useState({ width: 0, height: 0 });
  const [topSales, setTopSales] = useState<Array<TopSales>>([]);
  const [totalInventoryValue, setTotalInventoryValue] = useState<number>(0);
  const [totalSaleValue, setTotalSaleValue] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);
  const [remittanceRatio, setRemittanceRatio] = useState<{
    remitted: number;
    unremitted: number;
  }>({ remitted: 0, unremitted: 0 });
  const pieA = useRef<HTMLDivElement>(null);
  const graph = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      let response = await fetch("http://127.0.0.1:1338/dashboard/cog", {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });

      let data = await response.json();
      console.log(data);
      setTotalInventoryValue(data.total_cog);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let response = await fetch("http://127.0.0.1:1338/dashboard/ppu", {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });

      let data = await response.json();
      console.log(data);
      setTotalSaleValue(data.total_ppu);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let response = await fetch(
        "http://127.0.0.1:1338/dashboard/product_count",
        {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        }
      );

      let data = await response.json();
      console.log(data);
      setProductCount(data.count);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let response = await fetch("http://127.0.0.1:1338/dashboard/topsales", {
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      });

      let data = await response.json();
      console.log(data);
      setTopSales(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let response = await fetch(
        "http://127.0.0.1:1338/dashboard/remittance_ratio",
        {
          method: "GET",
          headers: {
            Accept: "*/*",
          },
        }
      );

      let data = await response.json();
      console.log(data);
      setRemittanceRatio({
        remitted: parseInt(data.remitted),
        unremitted: parseInt(data.unremitted),
      });
    })();
  }, []);

  useEffect(() => {
    console.log("hallo");
    if (refreshed) {
      setRefreshed(false);
    } else {
      setRefreshed(true);
      navigate("");
    }
    const updateSize = () => {
      if (pieA.current) {
        const width = pieA.current.offsetWidth;
        const height = pieA.current.offsetHeight;
        setPieSize({ width, height });
      }
      if (graph.current) {
        const width = graph.current.offsetWidth;
        const height = graph.current.offsetHeight;
        setGraphSize({ width, height });
      }
    };

    // Initial size update
    updateSize();

    // Add event listener for window resize
    window.addEventListener("resize", updateSize);

    // Remove event listener on component unmount1
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <Flex flex={1} flexDir="column" p={4}>
      <Grid
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(3, 1fr)"
        flex={1}
        gap={6}
      >
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p={2}
        >
          <Flex flexDir="column" h="100%" align="center" justify="center">
            <Text>PRODUCTS</Text>
            <Heading>{productCount}</Heading>
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p={2}
        >
          <Flex flexDir="column" h="100%" align="center" justify="center">
            <Text>
              TOTAL INVENTORY VALUE (
              {new Date()
                .toLocaleString("default", { month: "long" })
                .toUpperCase()}
              )
            </Text>
            <Heading>
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(totalSaleValue)}
            </Heading>
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p={2}
        >
          <Flex flexDir="column" h="100%" align="center" justify="center">
            <Text>
              TOTAL INVENTORY COST (
              {new Date()
                .toLocaleString("default", { month: "long" })
                .toUpperCase()}
              )
            </Text>
            <Heading>
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(totalInventoryValue)}
            </Heading>
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p={2}
        >
          <Chart
            options={{
              title: {
                text: "REMITTANCE RATIO",
                align: "center",
                style: {
                  color: colorMode === "dark" ? "white" : "black", // Set the font color of the legend
                },
              },
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
            series={[remittanceRatio.remitted, remittanceRatio.unremitted+0]}
            type="donut"
            height="100%"
          />
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={2}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p={2}
        >
          <Chart
            options={{
              chart: {
                type: "bar",
              },
              grid: {
                borderColor:
                  colorMode === "dark"
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.5)",
                yaxis: { lines: { show: false } },

                xaxis: { lines: { show: true } },
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
                axisBorder: {
                  color:
                    colorMode === "dark"
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(0,0,0,0.5)",
                },
                categories: topSales.map((val) => val.product_name),
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
                    fontWeight: "bold",
                    fontSize: "0.8em",
                    fontFamily: "Arial",
                  },
                  formatter: (val) => "" + val.toString().toUpperCase(),
                },
              },
              colors: ["#6640BF"],
              tooltip: {
                enabled: false,
              },
              title: {
                text: `TOP 5 SOLD PRODUCTS THIS MONTH (${new Date()
                  .toLocaleString("default", { month: "long" })
                  .toUpperCase()})`,
                align: "center",
                style: {
                  color: colorMode === "dark" ? "white" : "black", // Set the font color of the title
                },
              },
            }}
            series={[
              {
                data: topSales.map((val) => val.total_sale_quantity),
              },
            ]}
            type="bar"
            height="100%"
          />
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p={2}
        >
          <Chart
            options={{
              chart: {
                type: "pie",
              },
              labels: ["In-Stock", "Low-Stock", "No Stock"],

              colors: ["#22bb33", "#f0ad4e", "#bb2124"],
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
            type="donut"
            height="100%"
          />
        </GridItem>
        {/* <GridItem
          rowSpan={2}
          colSpan={1}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p={2}
        >
          <Flex flex={1}  flexDir='column' h='100%' >
          <Heading textAlign="center" size="lg">
            AGENT OF THE MONTH
          </Heading>
            <Center h="100%">
              <Box >
                <Avatar size='2xl' name="Mil Goku Predo" m="2" />
                <Heading size="md">Mil Goku Predo</Heading>
              </Box>
            </Center>
          </Flex>
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p={2}
        ></GridItem> */}
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
