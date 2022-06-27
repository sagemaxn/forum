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
} from "@chakra-ui/react";
import { useState } from 'react'
import { Formik, Form, Field } from "formik";

import { useChangeAvatarMutation } from "../generated/graphql";

function ChangeAvatar({ isOpen, onClose, avatar, user }) {
  const [val, setVal] = useState('')

  function CustomRadio(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    return (
      <Box as="label">
        <input {...input} />
        <Box {...checkbox} _checked={{ color: "red" }} >
          {props.children}
        </Box>
      </Box>
    );
  }
  
  function FormField({ name, children, ...rest }, props) {

    return (
      <Field name='avatar'>
        {({ field, form }) => (
          <FormControl>
            <CustomRadio  {...field} id={name}>{children}</CustomRadio>
          </FormControl>
        )}
      </Field>
    )
  }
  function handleChange(value) {
    console.log(value)
    setVal(value)
  }

  function Group() {
    const [change, { data }] = useChangeAvatarMutation()
    const avatars = [
      { name: 'default' },
      { name: 'star' },
      { name: 'heart' },
    ];
    const { value, getRootProps, getRadioProps } = useRadioGroup({
      defaultValue: avatar,
      onChange: handleChange
    });

    const group = getRootProps();
    return (
      <Formik
        initialValues={{ username: user, avatar: val }}
        onSubmit={async (values, actions) => {

          console.log(values)
          await change({ variables: values });
          if (data) {
            console.log(data)
          }
          actions.setSubmitting(false);
        }}>
        {(props) => (
          <Form>
            <HStack {...group}>
              {avatars.map((avatar) => (
                <FormField name={'avatar'} key={avatar.name}>
                  <CustomRadio {...getRadioProps({ value: avatar.name })}>
                    {avatar.name}
                  </CustomRadio>
                </FormField>
              ))}
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

export default ChangeAvatar
