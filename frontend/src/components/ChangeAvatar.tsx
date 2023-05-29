import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useRadio,
  useRadioGroup,
  Box,
  HStack,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import Image from 'next/image'
import { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";

import { useChangeAvatarMutation, PostsDocument } from "../generated/graphql";
import {initializeApollo} from "../lib/apollo";
function ChangeAvatar({ isOpen, onClose, avatar, user }) {
  const [val, setVal] = useState(avatar);

  function CustomRadio(props) {
    const { getInputProps, getCheckboxProps, getLabelProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const [checked, setChecked] = useState(val === props.value);

    return (
      <>
        <Box
          margin="10px"
          aria-label={props.label}
          as="label"
          htmlFor={input.id}
          {...checkbox}
          w="60px"
          overflow="hidden"
          style = { checked ? { outline: "black solid 3px"} :  null}
        >
          
          <Image src={`/${props.value}.png`}  width="60px" height="60px" style={{borderRadius: "100%"}} objectFit="contain"/>
        </Box>
        <input {...input} />
      </>
    );
  }

  const handleChange = (value) => {
    setVal(value);
  };

  function Group() {
    const [changeAvatar, { data }] = useChangeAvatarMutation();
    const avatars = [{ name: "default" }, { name: "star" }, { name: "heart" }, { name: "cat" }, { name: "dog" }];
    const { value, getRootProps, getRadioProps } = useRadioGroup({
      onChange: handleChange,
    });

    const group = getRootProps();

    return (
        <Formik
            initialValues={{ username: user, avatar: val }}
            onSubmit={async (values, actions) => {
              await changeAvatar({ variables: { ...values, username: user } });
              actions.setSubmitting(false);
              onClose();
              const apolloClient = initializeApollo();
              await apolloClient.refetchQueries({ include: [PostsDocument] });
            }}

        >
          {(props) => (
              <Form>
                <HStack {...group}>
                  <Field name="avatar">
                    {({ field, form }: FieldProps) => {
                      const { onChange, ...rest } = field;
                      return (
                          <FormControl id={"avatar"}>
                            <FormLabel htmlFor={"avatar"}></FormLabel>
                            {avatars.map((avatar) => (
                                <CustomRadio
                                    {...rest}
                                    {...getRadioProps({ value: avatar.name })}
                                    key={avatar.name}
                                    id={avatar.name}
                                >
                                  {avatar.name}
                                </CustomRadio>
                            ))}
                          </FormControl>
                      );
                    }}
                  </Field>
                  <Button
                      mt={4}
                      backgroundColor="green"
                      isLoading={props.isSubmitting}
                      type="submit"
                  >
                    Save
                  </Button>
                </HStack>
              </Form>
          )}
        </Formik>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pick New Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Group />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChangeAvatar;