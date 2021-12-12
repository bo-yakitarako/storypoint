import React, { useCallback } from 'react';
import { Flex, Select, Button } from '@chakra-ui/react';

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
  const [, setStoryPoint] = React.useState<string | null>(null);
  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStoryPoint(e.target.value || null);
  }, []);
  return (
    <Flex my={4} justifyContent="space-between">
      <Select placeholder="ポイント選ぼ" width="240px" onChange={onChange}>
        {STORY_POINTS.map((point) => (
          <option key={point} value={point}>
            {point}
          </option>
        ))}
      </Select>
      <Button colorScheme="green">送信！</Button>
    </Flex>
  );
};

export { StoryPointSetting };
