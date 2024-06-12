import React from 'react';
import { Button, Typography, Badge } from '@arco-design/web-react';

const { Text } = Typography;

const ACTIVE = 'ACTIVE';
const FREEZE = 'FREEZE';
const INACTIVE = 'INACTIVE';

export const Status = [
  { key: ACTIVE, text: '启用' },
  { key: FREEZE, text: '停用' },
  { key: INACTIVE, text: '未激活' },
];

export function getColumns(
  t: any,
  callback: (record: Record<string, any>, type: string) => Promise<void>
) {
  return [
    {
      title: t['systemUserTable.columns.id'],
      dataIndex: 'uuid',
      render: (value: string) => <Text copyable>{value}</Text>,
    },
    {
      title: t['systemUserTable.columns.nickname'],
      dataIndex: 'nickname',
    },
    {
      title: t['systemUserTable.columns.phone'],
      dataIndex: 'phone',
    },
    {
      title: t['systemUserTable.columns.is_admin'],
      dataIndex: 'is_admin',
      render: (x: boolean) => {
        return x ? '是' : '否';
      },
    },
    {
      title: t['systemUserTable.columns.status'],
      dataIndex: 'status',
      render: (x: string) => {
        for (const item of Status) {
          if (item.key === x) {
            return (
              <Badge
                dot={false}
                id={`status_` + item.key}
                status={
                  item.key === FREEZE
                    ? 'error'
                    : item.key === INACTIVE
                    ? 'warning'
                    : 'success'
                }
                text={item.text}
              ></Badge>
            );
          }
        }
      },
    },
    {
      title: t['systemUserTable.columns.created_at'],
      dataIndex: 'created_at',
    },
    {
      title: t['systemUserTable.columns.last_login_at'],
      dataIndex: 'last_login_at',
    },
    {
      title: t['systemUserTable.columns.operations'],
      dataIndex: 'operations',
      headerCellStyle: { paddingLeft: '15px' },
      render: (_, record) => (
        <>
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'view')}
          >
            {t['systemUserTable.columns.operations.view']}
          </Button>
          {record.status === FREEZE && (
            <Button
              type="text"
              size="small"
              onClick={() => callback(record, 'view')}
            >
              启用
            </Button>
          )}
          {record.status !== FREEZE && (
            <Button
              type="text"
              size="small"
              onClick={() => callback(record, 'view')}
            >
              停用
            </Button>
          )}
          <Button
            type="text"
            size="small"
            onClick={() => callback(record, 'view')}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
}
