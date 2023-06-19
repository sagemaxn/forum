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
    FormLabel,
} from "@chakra-ui/react";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useApolloClient } from '@apollo/client';

import {
    useChangeAvatarMutation,
    PostsDocument,
    CurrentUserAvatarDocument,
    ThreadsDocument,
    ThreadWithPostsDocument
} from "../generated/graphql";
import { initializeApollo } from "../lib/apollo";
function ChangeAvatar({ isOpen, onClose, user }) {
    const apolloClient = useApolloClient();
    const [val, setVal] = useState(null);

    useEffect(() => {
        const getCurrentAvatar = async () => {
            const { data } = await apolloClient.query({
                query: CurrentUserAvatarDocument,
                variables: { username: user },
            });
            setVal(data.currentUser.avatar);
        };

        getCurrentAvatar();
    }, []);

    function CustomRadio(props) {
        const { getInputProps, getCheckboxProps } = useRadio(props);
        const input = getInputProps();
        const checkbox = getCheckboxProps();

        return (
            <Box as="label" htmlFor={input.id} {...checkbox} w="60px" overflow="hidden" margin="10px" style={val === props.value ? { outline: "black solid 3px" } : null}>
                <Image src={`/${props.value}.png`} width="60px" height="60px" style={{ borderRadius: "100%" }} objectFit="contain" />
                <input {...input} />
            </Box>
        );
    }

    const handleChange = (value) => {
        setVal(value);
    };

    function Group() {
        const [changeAvatar] = useChangeAvatarMutation();
        const avatars = ["default", "star", "heart", "cat", "dog"];
        const { getRootProps, getRadioProps } = useRadioGroup({
            onChange: handleChange,
            value: val,
        });
        const group = getRootProps();

        return (
            <Formik
                enableReinitialize
                initialValues={{ avatar: val }}
                onSubmit={async (values, actions) => {
                    const response = await changeAvatar({ variables: { username: user, avatar: values.avatar } });
                    apolloClient.writeQuery({
                        query: CurrentUserAvatarDocument,
                        variables: { username: user },
                        data: {
                            currentUser: {
                                __typename: 'User',
                                avatar: response.data.changeAvatar.avatar,
                            },
                        },
                    });
                    actions.setFieldValue('avatar', response.data.changeAvatar.avatar);
                    actions.setSubmitting(false);
                    onClose();
                    await apolloClient.refetchQueries({ include: [ThreadWithPostsDocument, ThreadsDocument] });
                }}
            >
                {(props) => (
                    <Form>
                        <HStack {...group}>
                            <Field name="avatar">
                                {({ field }: FieldProps) => (
                                    <FormControl id="avatar">
                                        {avatars.map((avatar) => (
                                            <CustomRadio {...field} {...getRadioProps({ value: avatar })} key={avatar} id={avatar} />
                                        ))}
                                    </FormControl>
                                )}
                            </Field>
                            <Button mt={4}  backgroundColor="green" isLoading={props.isSubmitting} type="submit">Save</Button>
                        </HStack>
                    </Form>
                )}
            </Formik>
        );
    }

    return (
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
    );
}

export default ChangeAvatar;