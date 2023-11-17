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
import { avatarVar } from '../lib/apollo';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Field, FieldProps, Form, Formik } from 'formik';
import {
    useChangeAvatarMutation,
    useCurrentUserAvatarQuery,
} from '../generated/graphql';
function ChangeAvatar({ isOpen, onClose, user }) {
    const [val, setVal] = useState(null);
    const { data, loading, error } = useCurrentUserAvatarQuery({
        variables: { username: user },
    });
    useEffect(() => {
        if (!loading && data) {
            avatarVar(data.currentUser.avatar);
            setVal(data.currentUser.avatar);
        }
        if (error) {
            console.error(error);
        }
    }, [data, loading, error]);
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
        const [changeAvatar] = useChangeAvatarMutation({
            update(cache, { data: { changeAvatar } }) {
                cache.modify({
                    fields: {
                        currentUser(existingUser = {}) {
                            return {
                                ...existingUser,
                                avatar: changeAvatar.avatar,
                            };
                        },
                    },
                });
            },
        });

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
                    await changeAvatar({
                        variables: { username: user, avatar: values.avatar },
                    });
                    avatarVar(val);
                    actions.setSubmitting(false);
                    onClose();
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
