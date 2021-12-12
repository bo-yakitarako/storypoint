import React, { useCallback, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { finishDialogOpenState } from '../../modules/store';
import { setDB } from '../../modules/firebase';

const FinishAlert: React.FC = () => {
  const [isOpen, setOpen] = useRecoilState(finishDialogOpenState);
  const ref = useRef(null);
  const onClose = useCallback(() => setOpen(false), []);
  const finish = useCallback(() => {
    setDB('taskUrl', null);
    setDB('users', null);
    onClose();
  }, []);
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={ref}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          解散しましょ
        </AlertDialogHeader>

        <AlertDialogBody>プランニングつかれた〜もうやめない？</AlertDialogBody>

        <AlertDialogFooter>
          <Button onClick={onClose}>まだやめない</Button>
          <Button colorScheme="red" ml={3} onClick={finish}>
            もうやめますよ
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { FinishAlert };
