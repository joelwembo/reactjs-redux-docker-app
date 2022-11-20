import { EditIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  Avatar,
  Heading,
  useColorModeValue,
  Button,

} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTasks, updateSubtasksList } from "../Redux/AppReducer/action";


const TaskCard = ({ id, title, description, tags, task_status, subTasks, colorScheme }) => {
  const dispatch = useDispatch();
  const [checkbox, setCheckBox] = useState(() => {
    let data = subTasks
      .filter((item) => {
        return item.status && item.subTaskTitle;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });

  const updateSubTaskStatus = (value) => {
    let newSubTaskData = subTasks.map((item) => {
      if (value.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }
      return { ...item, status: false };
    });

    dispatch(updateSubtasksList(id, { subTasks: newSubTaskData })).then(() =>
      dispatch(getTasks())
    );
  };

  return (
    <Box
      width="100%"
      boxShadow="2px 5px 5px -3px rgba(0,0,0,0.1)"
      padding="10px">
      <Box
        justifyContent="space-between"
        maxW={'100%'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>

        <Avatar
          size={'xl'}
          src={"https://avatars.githubusercontent.com/u/19718580?s=400&u=5590595413f275e0ee8ba25bda9e330b750492c3&v=4"}
          alt={'Avatar Alt'}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3,
          }}
        />
       
        <Heading fontSize={'2xl'} fontFamily={'body'}>
             {title}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
           @joelwembo1
        </Text>
        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          {description}  {' '}
          <Link to={`/task/${id}`}>
             <EditIcon />    
             {/* Edit iCon */}
          </Link>{' '}
          me in your posts
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}> 
          {tags.length &&
              tags.map((item, index) => {
                return (
                  <><Badge
                    px={2}
                    py={1}
                    fontWeight={'400'}
                    key={index}
                    colorScheme={colorScheme}>
                    {item.tag}
                   </Badge><Text> {item.tag}</Text>
                  </>
                );
            })}  
        </Stack>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}> 
          <CheckboxGroup
            value={checkbox}
            onChange={(value) => {
              setCheckBox(value);
              updateSubTaskStatus(value);
            }}
          >
            {subTasks.length > 0 &&
              subTasks.map((item, index) => (
                <Checkbox key={index} value={item.subTaskTitle}>
                  <b>{item.subTaskTitle}</b>
                </Checkbox> 
              ))}
      
          </CheckboxGroup>
        </Stack>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            _focus={{
              bg: 'gray.200',
            }}>
            Edit
          </Button>
          <Button 
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            <Link to={`/task/${id}`}>
             <EditIcon />    
             {' '} {' '} Modify
          </Link>{' '}
          </Button>
        </Stack>
      </Box>
       {/* Checkbox for subtakss */}
    </Box>
  );
};

export default TaskCard;
