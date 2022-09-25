import React, { useCallback } from 'react';
import { Flex, Select, Button, useToast } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../../modules/store';
import { setDB } from '../../modules/firebase';

const STORY_POINTS = [
  '?',
  '0',
  '1/2',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '20',
  '40',
  '100',
  '∞',
];

const StoryPointSetting: React.FC = () => {
  const userId = useRecoilValue(userIdState);
  const [storyPoint, setStoryPoint] = React.useState<string | null>(null);
  const toast = useToast();

  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStoryPoint(e.target.value || null);
  }, []);

  const send = useCallback(() => {
    if (storyPoint) {
      setDB(`users/${userId}/storyPoint`, storyPoint);
      toast({
        title: '送信成功！',
        description: 'story pointは無事送信されたよ',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  }, [userId, storyPoint]);
  return (
    <Flex my={4} justifyContent="space-between">
      <Select placeholder="ポイント選ぼ" width="240px" onChange={onChange}>
        {STORY_POINTS.map((point) => (
          <option key={point} value={point}>
            {point}
          </option>
        ))}
      </Select>
      <Button colorScheme="green" onClick={send}>
        送信！
      </Button>
    </Flex>
  );
};

export { StoryPointSetting };
