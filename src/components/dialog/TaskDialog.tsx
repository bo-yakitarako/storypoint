import React, { useCallback } from 'react';
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
  jiraLinkDialogOpenState,
  jiraLinkState,
  planningUsersState,
} from '../../modules/store';
import { setDB } from '../../modules/firebase';

type Input = {
  link: string;
};

const TaskDialog: React.FC = () => {
  const [isOpen, setOpenState] = useRecoilState(jiraLinkDialogOpenState);
  const [linkState, setLink] = useRecoilState(jiraLinkState);
  const users = useRecoilValue(planningUsersState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Input>({
    mode: 'onChange',
    criteriaMode: 'all',
    shouldFocusError: false,
    defaultValues: { link: linkState ?? '' },
  });
  const handleClose = useCallback(() => setOpenState(false), []);
  const onSubmit: SubmitHandler<Input> = useCallback(
    (data) => {
      setLink(data.link);
      setDB('taskUrl', data.link);
      users.forEach(({ userId }) => {
        setDB(`users/${userId}/storyPoint`, '-');
      });
      handleClose();
    },
    [users],
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Jiraのリンクをェ😇</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormLabel>課題リンクを決めマッチョᕦ(ò_óˇ)ᕤ</FormLabel>
            <Input
              {...register('link', { required: true })}
              placeholder="https://autoscale.atlassian.net/browse/SW-XXXX"
            />
            {errors.link?.types?.required && (
              <Text color="red.500" fontSize="xs" mt={2}>
                ふおおおおおおなんでえええええ
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              type="submit"
              disabled={errors.link !== undefined}
            >
              {errors.link === undefined ? 'OKやで' : 'おっふ...'}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export { TaskDialog };
