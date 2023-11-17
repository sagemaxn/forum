import { Field } from 'formik';
import {
    Box,
    FormControl,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import TextareaAutosize from 'react-textarea-autosize';

interface propTypes {
    name: string;
    passwordVisible?: boolean;
    setPasswordVisible?: (visible: boolean) => void;
}

function FormField({ name, passwordVisible, setPasswordVisible }: propTypes) {
    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl
                    isInvalid={form.errors[name] && form.touched[name]}
                >
                    {InputField(name, field)}
                    <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );

    function InputField(name, field) {
        const placeholderName =
            name === 'confirmPassword' ? 'confirm password' : name;

        if (name === 'content' || name === 'firstPostContent') {
            return (
                <TextareaAutosize
                    {...field}
                    autoFocus
                    id={name}
                    maxLength="200"
                    minRows="1"
                    placeholder="Post Content"
                    required={true}
                    style={{
                        width: '100%',
                        padding: '7px 16px',
                        border: '1px solid #E2E8F0', // Light gray border
                        borderRadius: '4px',
                    }}
                ></TextareaAutosize>
            );
        } else if (name === 'title') {
            return (
                <Input
                    {...field}
                    background={'white'}
                    id={name}
                    maxLength="50"
                    placeholder="Thread Title"
                    required={true}
                />
            );
        } else if (name === 'password') {
            return (
                <InputGroup size="md">
                    <Input
                        {...field}
                        background={'white'}
                        id={name}
                        placeholder={placeholderName}
                        type={passwordVisible ? 'text' : 'password'}
                    />
                    <InputRightElement width="4.5rem">
                        <Box
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            {passwordVisible ? <HiEye /> : <HiEyeOff />}
                        </Box>
                    </InputRightElement>
                </InputGroup>
            );
        } else if (name === 'confirmPassword') {
            return (
                <Input
                    {...field}
                    background={'white'}
                    id={name}
                    placeholder={placeholderName}
                    type={passwordVisible ? 'text' : 'password'}
                />
            );
        }
        return (
            <Input
                {...field}
                background={'white'}
                id={name}
                placeholder={placeholderName}
                type={'input'}
            />
        );
    }
}

export default FormField;
