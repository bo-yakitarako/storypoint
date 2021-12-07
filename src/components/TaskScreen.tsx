import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { Flex, Heading, Link, Button } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { jiraLinkState } from '../modules/store';

const TaskScreen: React.FC = () => {
  const jiraLink = useRecoilValue(jiraLinkState);
  const linkText = useMemo(() => {
    if (jiraLink === null) {
      return 'SW-XXXX';
    }
    return jiraLink.split('/').reverse()[0];
  }, [jiraLink]);
  return (
    <Flex alignItems="center">
      <Heading as="h3" size="2xl">
        {jiraLink === null ? (
          linkText
        ) : (
          <Link href={jiraLink} isExternal color="blue.400">
            {linkText}
            <ExternalLinkIcon ml="4px" verticalAlign="-5px" />
          </Link>
        )}
      </Heading>
      <Button colorScheme="green" ml="16px">
        別のタスクに変更
      </Button>
    </Flex>
  );
};

export { TaskScreen };
