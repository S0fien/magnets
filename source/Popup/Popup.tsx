import * as React from 'react';
import './styles.scss';
import {useEffect, useState} from 'react';
import {MantineProvider} from '@mantine/styles';
import {Button, CopyButton, Flex} from '@mantine/core';
import {IconTrashX, IconMagnet} from '@tabler/icons-react';
import {deleteAll, get, update} from '../../utils/magnetLink';
import Magnet from '../../types/magnet';
import {Table} from '../components/Table';

const Popup: React.FC = () => {
  const [magnets, setMagnets] = useState<Magnet[]>([]);
  const [selection, setSelection] = useState<Magnet[]>([]);

  async function fetchData(): Promise<void> {
    const magnetsLinks: Magnet[] = await get();
    setMagnets(magnetsLinks);
  }

  const setCopied = async (): Promise<void> => {
    const copiedMagnets = magnets.filter((magnet: Magnet) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      selection.includes(magnet.linkUrl)
    );

    const newMagnets = magnets.map((magnet) => {
      if (copiedMagnets.includes(magnet))
        return {
          ...magnet,
          status: 'copied',
        };
      return magnet;
    });

    setMagnets(newMagnets);
  };

  useEffect(() => {
    if (magnets.length > 0) update(magnets);
  }, [magnets]);

  useEffect(() => {
    console.log('selection is ', selection);
  }, [selection]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className={'magnet-container'}>
        <Flex>
          <CopyButton value={selection.join(', ')}>
            {({copied, copy}): JSX.Element => (
              <Button
                rightIcon={
                  <IconMagnet size={24} strokeWidth={1} color={'white'} />
                }
                fullWidth
                color={copied ? 'teal' : 'blue'}
                onClick={async (): Promise<void> => {
                  copy();
                  await setCopied();
                }}
              >
                {copied ? 'Copied url' : 'Copy url'}
              </Button>
            )}
          </CopyButton>
          <Button
            fullWidth
            variant={'filled'}
            color={'pink'}
            leftIcon={<IconTrashX size={24} strokeWidth={1} color={'white'} />}
            onClick={async (): Promise<void> => {
              await deleteAll();
              await fetchData();
            }}
          >
            Delete list
          </Button>
        </Flex>
        {magnets.length === 0 ? (
          <p>No magnets added yet.</p>
        ) : (
          <Table data={magnets} select={{selection, setSelection}} />
        )}
      </div>
    </MantineProvider>
  );
};

export default Popup;
