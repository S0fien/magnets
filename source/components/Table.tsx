/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import {
  Table as MantineTable,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  Anchor,
  Badge,
} from '@mantine/core';
import Magnet from '../../types/magnet';
import Date from './Date';

const statusColor: Record<string, string> = {
  new: 'blue',
  copied: 'pink',
};

interface TableProps {
  data: Magnet[];
  select: {
    selection: Magnet[];
    setSelection: React.Dispatch<React.SetStateAction<Magnet[]>>;
  };
}

export const Table = ({data, select}: TableProps): JSX.Element => {
  const {selection, setSelection} = select;

  // TODO: fix ts issues and remoe estlint disable at top of file
  const toggleRow = (linkUrl: string): void => {
    // @ts-ignore
    setSelection((current) =>
      // @ts-ignore
      current.includes(linkUrl)
        ? // @ts-ignore
          current.filter((item) => item !== linkUrl)
        : // eslint-disable-next-line no-undef
          [...current, linkUrl]
    );
  };

  const toggleAll = (): void =>
    // @ts-ignore
    setSelection((current: Magnet[]) =>
      // @ts-ignore
      current.length === data.length ? [] : data.map((item) => item.linkUrl)
    );

  const rows = data.map((item) => {
    // @ts-ignore
    const selected = selection.includes(item.linkUrl);
    return (
      <tr key={item.id} className={`${selected ? 'row-selected' : ''}`}>
        <td>
          <Checkbox
            // @ts-ignore
            checked={selection.includes(item.linkUrl)}
            onChange={(): void => toggleRow(item.linkUrl)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar
              size={26}
              src={item.favIconUrl}
              radius={26}
              className={'favicon'}
            />
            <Anchor href={item.originUrl} size="sm">
              Origin
            </Anchor>
          </Group>
        </td>
        <td>
          <Anchor href={item.linkUrl} size="sm">
            Link
          </Anchor>
        </td>
        <td>
          <Badge
            color={statusColor[item.status.toLowerCase()]}
            variant={'outline'}
          >
            {item.status}
          </Badge>
        </td>
        <td>
          <Text size="sm" weight={500}>
            <Date date={item.addedAt} />
          </Text>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <MantineTable highlightOnHover={true} verticalSpacing="sm">
        <thead>
          <tr>
            <th>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
                transitionDuration={0}
              />
            </th>
            <th>Origin</th>
            <th>Magnet</th>
            <th>Status</th>
            <th>Added at</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </MantineTable>
    </ScrollArea>
  );
};

export default Table;
