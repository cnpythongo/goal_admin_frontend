import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Message,
  Checkbox,
} from '@arco-design/web-react';
import PermissionWrapper from '@/components/PermissionWrapper';
import {
  IconPlus,
  IconStop,
  IconCheckCircle,
  IconDelete,
} from '@arco-design/web-react/icon';
import useLocale from '@/utils/useLocale';
import SearchForm from './form';
import locale from './locale';
import styles from './style/index.module.less';
import { getColumns } from './constants';
import { GoalAdminPaginationProps } from '@/context';
import SystemAPI from '@/api/system/index';

const FormItem = Form.Item;

function SystemUserTable() {
  const t = useLocale(locale);

  const [modalVisible, setModalVisible] = React.useState(false);
  const [userForm] = Form.useForm();
  const createUser = () => {
    const values = userForm.getFields();
    SystemAPI.createAccountUser(values)
      .then((res) => {
        const data = res.data;
        if (data.code === 0) {
          Message.error(`新建成功`);
          setModalVisible(false);
          fetchData();
        } else {
          Message.error(`新建失败：` + data.msg);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
        Message.error('新建失败');
      });
  };

  const tableCallback = async (record, type) => {
    console.log(record, type);
  };
  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formParams, setFormParams] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPatination] = useState<GoalAdminPaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    limit: 10,
    page: 1,
    pageSizeChangeResetCurrent: true,
  });

  const fetchData = () => {
    const { page, limit } = pagination;
    setLoading(true);
    SystemAPI.getAccountUserList({
      page: page,
      limit,
      ...formParams,
    }).then((res) => {
      const data = res.data.data;
      setData(data.result);
      setPatination({
        ...pagination,
        page,
        limit,
        total: data.total,
      });
      setLoading(false);
    });
  };

  const onChangeTable = ({ current: page, pageSize: limit }) => {
    setPatination({
      ...pagination,
      page,
      limit,
    });
  };

  const handleSearch = (params: any) => {
    setPatination({ ...pagination, page: 1 });
    setFormParams(params);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.limit, JSON.stringify(formParams)]);

  return (
    <Card>
      <SearchForm onSearch={handleSearch} />
      <PermissionWrapper
        requiredPermissions={[
          { resource: 'menu.system.user', actions: ['write'] },
        ]}
      >
        <div className={styles['button-group']}>
          <Space>
            <Button
              type="primary"
              icon={<IconPlus />}
              onClick={() => setModalVisible(true)}
            >
              {t['systemUserTable.operations.add']}
            </Button>
            <Button type="default" icon={<IconCheckCircle />}>
              {t['systemUserTable.operations.use']}
            </Button>
            <Button icon={<IconStop />}>
              {t['systemUserTable.operations.freeze']}
            </Button>
            <Button status="danger" icon={<IconDelete />}>
              {t['systemUserTable.operations.delete']}
            </Button>
          </Space>
        </div>
      </PermissionWrapper>
      <Table
        rowKey="uuid"
        loading={loading}
        onChange={onChangeTable}
        pagination={pagination}
        columns={columns}
        data={data}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('onChange:', selectedRowKeys, selectedRows);
            setSelectedRowKeys(selectedRowKeys);
          },
          onSelect: (selected, record, selectedRows) => {
            console.log('onSelect:', selected, record, selectedRows);
          },
          checkboxProps: (record) => {
            return {
              disabled: record.id === '4',
            };
          },
        }}
      />

      <Modal
        title={<div style={{ textAlign: 'left' }}>新建用户</div>}
        visible={modalVisible}
        onOk={() => createUser()}
        onCancel={() => setModalVisible(false)}
        autoFocus={false}
        focusLock={true}
        maskClosable={false}
        escToExit={false}
      >
        <Form form={userForm} autoComplete="off">
          <FormItem label="手机号" field="phone" rules={[{ required: true }]}>
            <Input placeholder="手机号" />
          </FormItem>
          <FormItem label="密码" field="password" rules={[{ required: true }]}>
            <Input placeholder="密码" />
          </FormItem>
          <FormItem
            label="确认密码"
            field="password_confirm"
            rules={[{ required: true }]}
          >
            <Input placeholder="确认密码" />
          </FormItem>
          <FormItem label="昵称" field="nickname">
            <Input placeholder="昵称" />
          </FormItem>
          <FormItem label="邮箱" field="email">
            <Input placeholder="邮箱" />
          </FormItem>
          <FormItem label="后台管理员" field="is_admin">
            <Checkbox>后台管理员</Checkbox>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  );
}

export default SystemUserTable;
