import React from "react";
import {
    Button,
    Icon,
    IconButton,
    Avatar,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Grid,
    GridItem,
    List,
    ListItem,
    forwardRef,
} from '@chakra-ui/react';
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from 'react-icons/hi';
import { VscBellDot, VscClose } from 'react-icons/vsc';
import Logo from '../Logo';
import profilePicture from '../../assets/default-profile-picture.png';
import FormModal from '../FormModal';

const MenuDrawer = forwardRef((props, ref) => {
    const { isMobile } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const Header = () => (
      <Grid templateColumns='repeat(8, 1fr)' gap={4} marginTop='14px'>
        <GridItem colSpan={6}>
          <Icon as={VscClose} color='white' onClick={() => onClose()} fontSize='28px' />
        </GridItem>
        <GridItem colSpan={1}>
          <Icon as={VscBellDot} fontSize='30px' color='white' />
        </GridItem>
        <GridItem colSpan={1} textAlign='right' w='100%'>
          <Avatar size='sm' name='Profile Picture' marginLeft='10px' src={profilePicture} />
        </GridItem>
      </Grid>
    );
  
    const MobileHeader = () => (
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        <GridItem w='100%'>
          <Icon as={VscClose} color='white' onClick={() => onClose()} fontSize='32px' />
        </GridItem>
        <GridItem w='100%'>
          <Logo margin='auto' />
        </GridItem>
        <GridItem w='100%' textAlign='right'>
          <Avatar margin='auto' size='sm' name='Profile Picture' src={profilePicture} />
        </GridItem>
      </Grid>
    );
  
    return (
      <>
        <IconButton
          ref={ref}
          as={Button}
          icon={!isMobile ? <HiOutlineMenuAlt2 color='white' /> : <HiOutlineMenuAlt3 color='white' />}
          fontSize='32px'
          backgroundColor='inherit'
          variant='unstyled'
          onClick={onOpen}
          _hover={{
            transform: 'scale(1.1)',
            transition: '0.6s',
            background: 'none',
          }}
        />
        <Drawer isOpen={isOpen} placement='right' finalFocusRef={ref} size='md'>
          <DrawerOverlay />
          <DrawerContent backgroundColor='#242424' lineHeight='40px' fontSize='16px' letterSpacing='4px'>
            <DrawerHeader width='100%' display='flex' flexDirection='row'>
              {!isMobile ? <MobileHeader /> : <Header />}
            </DrawerHeader>
            <DrawerBody>
              <List
                spacing='22px'
                marginLeft={!isMobile ? '14px' : '28px'}
                fontSize='22px'
                fontWeight='normal'
                letterSpacing='4px'
              >
                <ListItem>Inicio</ListItem>
                <ListItem>Series</ListItem>
                <ListItem>Peliculas</ListItem>
                <ListItem>Agregadas Recientemente</ListItem>
                <ListItem>Populares</ListItem>
                <ListItem>Mis Peliculas</ListItem>
                <ListItem>Mi Lista</ListItem>
                <FormModal />
                <ListItem>Cerrar Sesión</ListItem>
              </List>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  });
  
  export default MenuDrawer;