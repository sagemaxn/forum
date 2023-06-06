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

    // Fetch the current avatar when the modal opens
    useEffect(() => {
        if (isOpen) {
            apolloClient.query({
                query: CurrentUserAvatarDocument,
                variables: { username: user },
            }).then((response) => {
                setVal(response.data.currentUser.avatar);
            });
        }
    }, [isOpen, user, apolloClient]);

    function CustomRadio(props) {
        const { getInputProps, getCheckboxProps } = useRadio(props);
        const input = getInputProps();
        const checkbox = getCheckboxProps();

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
                    style={val === props.value ? { outline: "black solid 3px" } : null}
                >
                    <Image src={`/${props.value}.png`} width="60px" height="60px" style={{ borderRadius: "100%" }} objectFit="contain" />
                </Box>
                <input {...input} />
            </>
        );
    }

    const handleChange = (value) => {
        setVal(value);
    };

    function Group() {
        const [changeAvatar, { data }] = useChangeAvatarMutation({
            onCompleted: (data) => {
                apolloClient.cache.writeQuery({
                    query: CurrentUserAvatarDocument,
                    variables: { user },
                    data: {
                        currentUser: {
                            __typename: 'User',
                            avatar: data.changeAvatar.avatar,
                        },
                    },
                });
                // Also update the local state
                setVal(data.changeAvatar.avatar);
            },
        });

        const avatars = [{ name: "default" }, { name: "star" }, { name: "heart" }, { name: "cat" }, { name: "dog" }];
        const { getRootProps, getRadioProps } = useRadioGroup({
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
                    await apolloClient.refetchQueries({ include: [ThreadWithPostsDocument, ThreadsDocument] });
                }}
            >
                {(props) => (
                    <Form>
                        <HStack {...group}>
                            <Field name="avatar">
                                {({ field }: FieldProps) => {
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
