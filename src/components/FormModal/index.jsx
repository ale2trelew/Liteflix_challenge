import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  ListItem,
  ListIcon,
  FormControl,
  Progress,
  Icon,
  Text,
  Box,
} from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlinePaperClip } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import CustomButton from "../Button";

import { ContainerInput } from "./styles/formModal";
import Logo from "../Logo";

const FormModal = ({ isNavbar }) => {
  const [progress, setProgress] = useState(0);
  const [onSuccess, setOnSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [formValues, setFormValues] = useState({
    original_title: "",
    backdrop_path: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptFiles) => {
      const file = acceptFiles[0];
      handleImage(file);
    },
  });

  const handleImage = (files) => {
    const fileReader = new FileReader();

    fileReader.onerror = () => {
      setIsError(true);
    };

    fileReader.onloadstart = (data) => {
      if (fileReader.readyState === 1) {
        let valueProgress = parseInt(data.loaded);
        setProgress(valueProgress);
      }
    };

    fileReader.onprogress = (data) => {
      if (fileReader.readyState === 1) {
        let valueProgress = parseInt((data.loaded / data.total) * 50, 10);
        setProgress(valueProgress);
      }
    };

    fileReader.onloadend = (data) => {
      if (fileReader.readyState === 2) {
        let valueProgress = parseInt((data.loaded / data.total) * 100, 10);
        setProgress(valueProgress);
        setFormValues({ ...formValues, backdrop_path: fileReader.result });
        setIsDisabled(false);
      }
    };

    fileReader.readAsDataURL(files);
  };

  const generateId = () => Math.random().toString(36).substr(2);

  const onSubmit = (e) => {
    e.preventDefault();
    const { original_title, backdrop_path } = formValues;

    if (original_title === "" || backdrop_path === "") return;

    const movie = {
      original_title,
      backdrop_path,
    };

    movie.id = generateId();
    localStorage.setItem("OwnMovies", JSON.stringify(movie));

    setOnSuccess(true);
  };

  const progressText = (label, color, align, top, bottom) => (
    <Text
      color={color ?? "#fff"}
      textAlign={align}
      fontSize="18px"
      fontWeight="normal"
      mb={bottom}
      mt={top}
      lineHeight="16px"
      letterSpacing="4px"
    >
      {label}
    </Text>
  );

  const OpenButton = () => {
    if (isNavbar) {
      return (
        <Button
          leftIcon={<AiOutlinePlus size={20} />}
          variant="ghost"
          size="md"
          textTransform="uppercase"
          fontSize="18px"
          fontWeight="normal"
          letterSpacing="4px"
          marginLeft="64px"
          _hover={{ transform: "scale(1.1)", transition: "0.6s" }}
          onClick={onOpen}
        >
          Agregar película
        </Button>
      );
    }

    return (
      <ListItem
        style={{ margin: "50px auto" }}
        onClick={onOpen}
        cursor="pointer"
      >
        <ListIcon as={AiOutlinePlus} color="white" mb="4px" />
        Agregar Pelicula
      </ListItem>
    );
  };

  const renderSuccessMessage = () => (
    <Box textAlign="center">
      {isNavbar && <Logo margin="64px 0 0 0" />}
      <Text
        mt={isNavbar ? "70px" : "190px"}
        fontSize="24px"
        lineHeight="26px"
        letterSpacing="4px"
      >
        ¡Felicitaciones!
      </Text>
      <Text mt="32px" fontSize="20px" lineHeight="32px" letterSpacing="4px">
        Liteflix The Movie fue correctamente subida.
      </Text>
      <CustomButton
        title="Ir a Home"
        background="#fff"
        border="1px solid rgba(255, 255, 255, 0.5)"
        _hover={{ background: "#242424", color: "#fff" }}
        margin={isNavbar ? "48px 0 0" : "100px 0 0"}
        disabled={isDisabled}
        color="#242424"
        onClick={onClose}
      />
    </Box>
  );

  const renderForm = () => (
    <FormControl textAlign="center">
      {progress > 0 ? (
        <>
          {isError ? (
            <>
              {progressText(
                "¡Error! No se pudo cargar la pelicula",
                null,
                "left",
                null,
                "10px"
              )}
              <Progress colorScheme="red" value={progress} />
              <Text
                color="#fff"
                textAlign="right"
                fontSize="18px"
                fontWeight="normal"
                mt="10px"
                lineHeight="21px"
                letterSpacing="4px"
              >
                Reintentar
              </Text>
            </>
          ) : (
            <>
              {progressText(`${progress}% Cargado`, null, "left", null, "10px")}
              <Progress colorScheme="teal" value={progress} />
              {progress === 100
                ? progressText("Listo!", "#64EEBC", "right", "10px")
                : progressText("Cancelar", null, "right", null, "10px")}
            </>
          )}
        </>
      ) : (
        <ContainerInput {...getRootProps()}>
          <Input
            type="file"
            id="movie"
            defaultValue=""
            accept="image/png,image/jpeg"
            onChange={(e) => handleImage(e.target.files[0])}
            {...getInputProps()}
          />
          <Icon as={AiOutlinePaperClip} height="16px" mr="5px" />
          {isNavbar ? (
            <Text>Agregá un archivo o arrastralo y soltalo aquí</Text>
          ) : (
            <Text>Agregá un archivo</Text>
          )}
        </ContainerInput>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Input
          value={formValues.original_title}
          placeholder="Título"
          type="text"
          border="none"
          background="transparent"
          fontSize="16px"
          mt={isNavbar ? "25px" : "94px"}
          letterSpacing="4px"
          lineHeight="16px"
          textAlign="center"
          variant="unstyled"
          width="248px"
          p="16px"
          borderRadius="none"
          borderBottom="solid 1px #fff"
          onChange={(e) =>
            setFormValues({ ...formValues, original_title: e.target.value })
          }
        />
        <CustomButton
          title="Subir Película"
          type="submit"
          background="#fff"
          border="1px solid rgba(255, 255, 255, 0.5)"
          _hover={{ background: "#242424" }}
          margin={isNavbar ? "48px 0 0" : "100px 0 0"}
          disabled={isDisabled}
          onClick={(e) => onSubmit(e)}
          color="#242424"
        />
        {!isNavbar && (
          <CustomButton
            title="Salir"
            onClick={() => onClose()}
            background="rgba(36, 36, 36, 0.5)"
            border="1px solid rgba(255, 255, 255, 0.5)"
            _hover={{ background: "#242424" }}
            margin="24px 0 0"
          />
        )}
      </div>
    </FormControl>
  );

  return (
    <>
      <OpenButton />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        {isNavbar && <ModalOverlay bg="black.100" backdropFilter="blur(3px)" />}
        <ModalContent
          bg="#242424"
          borderRadius="none"
          height={isNavbar ? "440px" : "85vh"}
        >
          {!onSuccess && (
            <ModalHeader
              textAlign="center"
              color="#64EEBC"
              fontSize="20px"
              letterSpacing="4px"
              fontWeight="normal"
              mt="20px"
            >
              Agregar Pelicula
            </ModalHeader>
          )}
          <ModalCloseButton />
          <ModalBody>
            {!onSuccess ? renderForm() : renderSuccessMessage()}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FormModal;
