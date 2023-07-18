import { Field } from 'formik';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import TextareaAutosize from 'react-textarea-autosize';

interface propTypes {
    name: string;
    toggle?: boolean;
}

function FormField({ name, toggle }: propTypes) {
    return (
        <Field name={name}>
            {({ field }) => (
                <FormControl>{InputField(name, field)}</FormControl>
            )}
        </Field>
    );

    function InputField(name, field) {
        if (name === ('content' || 'firstPostContent')) {
            return (
                <TextareaAutosize
                    {...field}
                    autoFocus
                    color="red"
                    id={name}
                    maxLength="200"
                    minRows="1"
                    placeholder="Make New Post"
                    required={true}
                    style={{ width: '100%' }}
                ></TextareaAutosize>
            );
        } else if (name === 'title') {
            return (
                <>
                    <Input
                        {...field}
                        background={'white'}
                        id={name}
                        maxLength="50"
                        placeholder="Thread Title"
                        required={true}
                    />
                </>
            );
        }
        return (
            <>
                <FormLabel htmlFor={name} margin="1.5">
                    {name}
                </FormLabel>
                <Input
                    {...field}
                    background={'white'}
                    id={name}
                    placeholder={name}
                    type={toggle ? 'password' : 'input'}
                />
            </>
        );
    }
}

export default FormField;
