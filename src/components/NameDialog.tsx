import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { nameDialogOpenState, nameState } from '../modules/store';

type Input = {
  name: string;
};

const NameDialog: React.FC = () => {
  const [isOpen, setOpenState] = useRecoilState(nameDialogOpenState);
  const [name, setName] = useRecoilState(nameState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Input>({
    mode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: { name: name ?? '' },
  });
  const handleClose = useCallback(() => setOpenState(false), []);
  const onSubmit: SubmitHandler<Input> = useCallback((data) => {
    localStorage.name = data.name;
    setName(data.name);
    handleClose();
  }, []);

  useEffect(() => {
    if (name === null) {
      setOpenState(true);
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>名前ェ😇</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormLabel>名前を決めマッチョᕦ(ò_óˇ)ᕤ</FormLabel>
            <Input
              {...register('name', { required: true })}
              placeholder="名前入れてほし〜〜〜"
            />
            {errors.name?.types?.required && (
              <Text color="red.500" fontSize="xs" mt={2}>
                名前ない...どうして...
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" type="submit">
              君に決めた！
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { NameDialog };
