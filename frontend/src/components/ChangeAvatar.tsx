import {
    Box,
    Button,
    FormControl,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useRadio,
    useRadioGroup,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useApolloClient } from '@apollo/client';

import {
    CurrentUserAvatarDocument,
    ThreadsDocument,
    ThreadWithPostsDocument,
    useChangeAvatarMutation,
} from '../generated/graphql';

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
        getCurrentAvatar().catch(error => {
            console.error('Failed to get current avatar:', error);
        });
    }, [apolloClient, user]);

    function CustomRadio(props) {
        const { getInputProps, getCheckboxProps } = useRadio(props);
        const input = getInputProps();
        const checkbox = getCheckboxProps();

        return (
            <Box
                as="label"
                htmlFor={input.id}
                {...checkbox}
                margin="10px"
                overflow="hidden"
                style={
                    val === props.value ? { outline: 'black solid 3px' } : null
                }
                w="60px"
            >
                <Image
                    alt={'value'}
                    height="60px"
                    objectFit="contain"
                    src={`/${props.value}.png`}
                    style={{ borderRadius: '100%' }}
                    width="60px"
                />
                <input {...input} />
            </Box>
        );
    }

    const handleChange = value => {
        setVal(value);
    };

    function Group() {
        const [changeAvatar] = useChangeAvatarMutation();
        const avatars = ['default', 'star', 'heart', 'cat', 'dog'];
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
                    const response = await changeAvatar({
                        variables: { username: user, avatar: values.avatar },
                    });
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
                    actions.setFieldValue(
                        'avatar',
                        response.data.changeAvatar.avatar,
                    );
                    actions.setSubmitting(false);
                    onClose();
                    await apolloClient.refetchQueries({
                        include: [ThreadWithPostsDocument, ThreadsDocument],
                    });
                }}
            >
                {props => (
                    <Form>
                        <HStack {...group}>
                            <Field name="avatar">
                                {({ field }: FieldProps) => (
                                    <FormControl id="avatar">
                                        {avatars.map(avatar => (
                                            <CustomRadio
                                                {...field}
                                                {...getRadioProps({
                                                    value: avatar,
                                                })}
                                                id={avatar}
                                                key={avatar}
                                            />
                                        ))}
                                    </FormControl>
                                )}
                            </Field>
                            <Button
                                backgroundColor="green"
                                isLoading={props.isSubmitting}
                                mt={4}
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
