import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Header from "../../components/Header/Header";
import Category from "../../components/Category/Category";
import Menu from "../../components/Menu/Menu";
import SectionService from "../../components/SectionService/SectionService";
import Footer from "../../components/Footer/Footer";
import { Box, Heading, Text, Container, Spinner } from "@chakra-ui/react";
import restaurantImage from "../../images/restaurant-1.jpg";

const OurMenu = () => {
  const [menus, setMenus] = useState([]);
  const [menusIsLoading, setMenusIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesIsLoading, setCategoriesIsLoading] = useState(false);
  const [filteredMenus, setFilteredMenu] = useState([]);
  const [activeLink, setActiveLink] = useState("");
  const [isMenuData, setIsMenuData] = useState(false);

  const fetchMenus = async () => {
    setMenusIsLoading(true);
    const sendingRequestMenus = await fetch(
      `${process.env.REACT_APP_API_MENUS}`
    );
    const menusResponse = await sendingRequestMenus.json();
    setMenus(menusResponse);
    setFilteredMenu(menusResponse);
    setMenusIsLoading(false);
  };

  const fetchCategories = async () => {
    setCategoriesIsLoading(true);
    const sendingRequestCategories = await fetch(
      `${process.env.REACT_APP_API_CATEGORIES}`
    );
    const categoriesResponse = await sendingRequestCategories.json();
    const getCategories = categoriesResponse.map((category) => category.name);
    const newCategories = ["all", ...getCategories];
    setCategories(newCategories);
    setCategoriesIsLoading(false);
    setActiveLink("all");
    if (menus.length === 0) {
      setIsMenuData(true);
    }
  };

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  const filterCategories = (category) => {
    if (category === "all") {
      setFilteredMenu(menus);
      setActiveLink("all");
      return;
    }
    const newMenus = menus.filter((menu) => menu.category.name === category);
    setFilteredMenu(newMenus);
    setActiveLink(category);
  };

  return (
    <>
      <Nav />
      <Header bgImage={restaurantImage} bgColor="rgba(0, 0, 0, 0.4)">
        <Box
          textAlign="center"
          d="flex"
          flexFlow="column nowrap"
          maxWidth="80%"
        >
          <Heading
            as="h4"
            fontWeight="500"
            fontFamily="var(--Bebas-Neue)"
            mb="1rem"
            letterSpacing="2px"
          >
            Our Menu
          </Heading>
          <Text
            fontSize="1.2rem"
            fontFamily="var(--Libre-Baskerville)"
            alt=" Mickey Gilley"
          >
            If you have good food, people will come to your restaurant.
          </Text>
        </Box>
      </Header>
      <Box as="main" d="flex" justifyContent="center" alignItems="center">
        <Container my={{ base: "2rem", lg: "5rem" }} maxWidth={{ lg: "90%" }}>
          <Box
            d="flex"
            justifyContent="center"
            alignItems="center"
            flexFlow="column nowrap"
          >
            {categoriesIsLoading && (
              <Box
                mx="auto"
                d="flex"
                flexFlow="column"
                justifyContent="center"
                alignItems="center"
                mb="1.5rem"
              >
                <Spinner mx="auto" color="#CD916D" mb="1rem" size="sm" />
                <Text
                  fontFamily="var(--Bebas-Neue)"
                  fontSize="1.2rem"
                  letterSpacing="2px"
                  mx="auto"
                >
                  Loading Categories.....
                </Text>
              </Box>
            )}
          </Box>
          {!categoriesIsLoading && (
            <Category
              categories={categories}
              filterCategories={filterCategories}
              activeLink={activeLink}
            />
          )}

          {menusIsLoading && (
            <Box
              mx="auto"
              d="flex"
              flexFlow="column"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner mx="auto" color="#CD916D" mb="1rem" size="md" />
              <Text
                mx="auto"
                fontFamily="var(--Bebas-Neue)"
                fontSize="1.2rem"
                letterSpacing="2px"
              >
                Loading Menu.....
              </Text>
            </Box>
          )}
          {isMenuData && (
            <Text
              textAlign="center"
              fontFamily="var(--Bebas-Neue)"
              fontSize="1.2rem"
              letterSpacing="2px"
            >
              No data menu available.
            </Text>
          )}
          {!menusIsLoading && <Menu menus={filteredMenus} />}
        </Container>
      </Box>
      <SectionService />
      <Footer />
    </>
  );
};

export default OurMenu;
