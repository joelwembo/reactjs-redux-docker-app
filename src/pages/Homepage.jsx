import { ReactNode } from 'react';
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import TaskCard from "../Components/TaskCard";
import { getTasks } from "../Redux/AppReducer/action";
import {
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

import { Button as Tucc } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const Links = ['Dashboard', 'Projects', 'Team'];


const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

const Homepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tasks = useSelector((state) => state.AppReducer.tasks);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const filterByParamTags = (task) => {
    //to filter out the tags that we have based on the params
    const tagsInTheParams = searchParams.getAll("tags");
    if (tagsInTheParams.includes("All") || tagsInTheParams.length === 0) {
      return task;
    }
    const data = task.tags.filter((tag) => {
      if (tagsInTheParams.includes(tag)) {
        return true;
      }
      return false;
    });

    if (data.length) {
      return task;
    }
    return false;
  };

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
  }, [dispatch, tasks.length]);

  return (
    
    <Box width="100%" paddingTop="1rem" bg={"#FFFFFF"} color="black">

      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}  bg={"#FFFFF"}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
                <Avatar
                  size={'md'}
                  src={
                    'https://images.unsplash.com/photo-1493166438816-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />       
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Action
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Account</MenuItem>
                <MenuItem>Privacy</MenuItem>
                <MenuDivider />
                <MenuItem> </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>


        
      <Flex justifyContent="space-around">
        {/* Todo */}
        <Box
          border="1px solid rgba(255,255,255,1)"
          borderRadius="5px"
          marginTop="3rem"
          width="35%"
          height="95vh"
          overflow="auto"
          color="black"
        >
          <Box bg={"#0791E5"} position="sticky" top="0" zIndex="1">
            <Text textAlign="center" fontWeight="bold">
              TODO
            </Text>
          </Box>
          {/* todo tasks */}
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "todo")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="green" />;
              })}
        </Box>

        {/* in-progress */}

        <Box
          border="1px solid rgba(255,255,255,1)"
          width="32%"
          borderRadius="5px"
          marginTop="3rem"
          height="95vh"
          overflow="auto"
          color="black"
        >
          <Box
            backgroundColor="yellow.100"
            position="sticky"
            top="0"
            zIndex="1"
          >
            <Text textAlign="center" fontWeight="bold">
              IN-PROGRESS
            </Text>
          </Box>
          {/* in-progress tasks */}
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "in-progress")
              .filter(filterByParamTags)
              .map((item) => {
                return (
                  <TaskCard key={item.id} {...item} colorScheme="yellow" />
                );
              })}
        </Box>

        {/* Done */}

        <Box
          border="1px solid rgba(255,255,255,1)"
          width="32%"
          height="95vh"
          marginTop="3rem"
          borderRadius="5px"
          overflow="auto"
          color="black"
        >
          <Box bg={"#44D908"} position="sticky" top="0" zIndex="1">
            <Text textAlign="center" fontWeight="bold">
              DONE
            </Text>
          </Box>
          {/* done tasks */}
          {tasks.length > 0 &&
            tasks
              .filter((item) => item.task_status === "done")
              .filter(filterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} colorScheme="blue" />; 
              })}
        </Box>
      </Flex>
    </Box>
  );
};

export default Homepage;
