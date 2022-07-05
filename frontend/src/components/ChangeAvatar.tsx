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
  Image,
  FormLabel
} from "@chakra-ui/react";
import { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";

import { useChangeAvatarMutation } from "../generated/graphql";

function ChangeAvatar({ isOpen, onClose, avatar, user }) {
  const [val, setVal] = useState("");

  function CustomRadio(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const [checked, setChecked] = useState(val === props.value);
    return (
      <>
        <Box
          aria-label={props.label}
          as="label"
          htmlFor={input.id}
          {...checkbox}
          style = { checked ? {background : "red", border: "blue solid"} :  null}
        >
          {props.children}
        </Box>
        <input {...input} />
      </>
    );
  }

  const handleChange = (value) => {
    console.log(value);
    setVal(value);
  };

  function Group() {
    const [change, { data }] = useChangeAvatarMutation();
    const avatars = [{ name: "default" }, { name: "star" }, { name: "heart" }];
    const { value, getRootProps, getRadioProps } = useRadioGroup({
      onChange: handleChange,
    });

    const group = getRootProps();
    return (
      <Formik
        initialValues={{ username: user, avatar: val }}
        onSubmit={async (values, actions) => {
          console.log(values);
          await change({ variables: values });
          if (data) {
            console.log(data);
          }
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <HStack {...group}>
              <Field name="avatar">
                {({ field, form }: FieldProps) => {
                  const { onChange, ...rest } = field;
                  return (
                    <FormControl
                      id={'avatar'}
                    >
                      <FormLabel htmlFor={'avatar'}>{'avatar'}</FormLabel>
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
              ;;
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