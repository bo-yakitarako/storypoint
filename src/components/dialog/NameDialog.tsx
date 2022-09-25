import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  includeInPlanningUsersSelector,
  nameDialogOpenState,
  nameState,
  userIdState,
} from '../../modules/store';
import { setDB } from '../../modules/firebase';

type Input = {
  name: string;
};

const NameDialog: React.FC = () => {
  const [isOpen, setOpenState] = useRecoilState(nameDialogOpenState);
  const [name, setName] = useRecoilState(nameState);
  const userId = useRecoilValue(userIdState);
  const isInUsers = useRecoilValue(includeInPlanningUsersSelector);
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
  const onSubmit: SubmitHandler<Input> = useCallback(
    (data) => {
      localStorage.name = data.name;
      setName(data.name);
      if (isInUsers) {
        setDB(`users/${userId}/name`, data.name);
      }
      handleClose();
    },
    [userId, isInUsers],
  );

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
      closeOnEsc={name !== null}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>名前ェ😇</ModalHeader>
        {name !== null && <ModalCloseButton />}
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
            <Button
              colorScheme="blue"
              type="submit"
              disabled={errors.name !== undefined}
            >
              {errors.name === undefined ? '君に決めた！' : '一体誰なんだ...'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { NameDialog };
