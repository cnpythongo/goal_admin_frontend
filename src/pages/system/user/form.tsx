import React, { useContext } from 'react';
//import dayjs from 'dayjs';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Grid,
} from '@arco-design/web-react';
import { GlobalContext } from '@/context';
import locale from './locale';
import useLocale from '@/utils/useLocale';
import { IconRefresh, IconSearch } from '@arco-design/web-react/icon';
import { Status, TrueFalse } from './constants';
import styles from './style/index.module.less';

const { Row, Col } = Grid;
const { useForm } = Form;

function SearchForm(props: {
  onSearch: (values: Record<string, any>) => void;
}) {
  const { lang } = useContext(GlobalContext);

  const t = useLocale(locale);
  const [form] = useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values);
    props.onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    props.onSearch({});
  };

  const colSpan = lang === 'zh-CN' ? 8 : 12;

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label={t['systemUserTable.columns.id']} field="uuid">
              <Input placeholder={t['systemUserTable.columns.id']} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t['systemUserTable.columns.phone']} field="phone">
              <Input
                allowClear
                placeholder={t['systemUserTable.columns.phone']}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={t['systemUserTable.columns.created_at']}
              field="created_at"
            >
              <DatePicker.RangePicker
                allowClear
                style={{ width: '100%' }}
                showTime={true}
                format="YYYY-MM-DD HH:mm:ss"
                //disabledDate={(date) => dayjs(date).isAfter(dayjs())}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={t['systemUserTable.columns.last_login_at']}
              field="last_login_at"
            >
              <DatePicker.RangePicker
                allowClear
                style={{ width: '100%' }}
                showTime={true}
                format="YYYY-MM-DD HH:mm:ss"
                //disabledDate={(date) => dayjs(date).isAfter(dayjs())}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={t['systemUserTable.columns.status']}
              field="status"
            >
              <Select
                placeholder={t['systemUserTable.all.placeholder']}
                options={Status.map((item) => {
                  return {
                    label: item.text,
                    value: item.key,
                  };
                })}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              label={t['systemUserTable.columns.is_admin']}
              field="is_admin"
            >
              <Select
                placeholder={t['systemUserTable.all.placeholder']}
                options={TrueFalse.map((item) => {
                  return {
                    label: item.text,
                    value: item.key,
                  };
                })}
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<IconSearch />} onClick={handleSubmit}>
          {t['systemUserTable.form.search']}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t['systemUserTable.form.reset']}
        </Button>
      </div>
    </div>
  );
}

export default SearchForm;
