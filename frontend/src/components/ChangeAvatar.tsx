import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
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
import { Formik, Form, Field } from "formik";
import { userInfo } from "os";

import { useChangeAvatarMutation } from "../generated/graphql";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="3px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function Radio({username, avatar}) {
  const options = ["default", "star", "heart"];
  const [change, { data }] = useChangeAvatarMutation()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Formik
      initialValues={{ username, avatar}}
      onSubmit={async (values, actions) => {
        console.log(values, '1')
        await change({ variables: values});
        if (data) {
          console.log(data);
        }
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <>
          <HStack {...group}>
            <Form>
              <Field>
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel htmlFor="avatar">avatar</FormLabel>

                    {options.map((value) => {
                      console.log(value)
                      const radio = getRadioProps({ value });
                      return (
                        <RadioCard key={value} {...radio}>
                          {value}
                        </RadioCard>
                      );
                    })}
                  </FormControl>
                )}
              </Field>

              <Button
                mt={4}
                backgroundColor="green"
                w="100%"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Post
              </Button>
            </Form>
          </HStack>
        </>
      )}
    </Formik>
  );
}

const ChangeAvatar = ({ isOpen, onClose, avatar, user }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pick New Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Radio username={user} avatar={avatar}/>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              cancel
            </Button>
            <Button mr={3} onClick={onClose}>
              save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeAvatar;
