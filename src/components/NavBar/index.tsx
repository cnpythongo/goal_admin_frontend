import React, { useEffect } from 'react';
import {
  Avatar,
  Dropdown,
  Menu,
  Divider,
  Message,
} from '@arco-design/web-react';
import {
  IconNotification,
  IconSettings,
  IconPoweroff,
  IconExperiment,
  IconDashboard,
  IconInteraction,
  IconLoading,
} from '@arco-design/web-react/icon';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from '@/store';
import useLocale from '@/utils/useLocale';
import Logo from '@/assets/logo.svg';
import MessageBox from '@/components/MessageBox';
import IconButton from './IconButton';
import styles from './style/index.module.less';
import useStorage from '@/utils/useStorage';
import { generatePermission } from '@/routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Navbar({ show }: { show: boolean }) {
  const t = useLocale();
  const { userInfo, userLoading } = useSelector((state: GlobalState) => state);

  const [, , removeUserStatus] = useStorage('goalAdminLoginStatus');
  const [, , removeGoalAdminAuthInfo] = useStorage('goalAdminAuthInfo');

  function logout() {
    removeUserStatus();
    removeGoalAdminAuthInfo();
    window.location.href = '/login';
  }

  function onMenuItemClick(key: string) {
    if (key === 'logout') {
      logout();
    } else {
      Message.info(`You clicked ${key}`);
    }
  }

  // useEffect(() => {
  //   dispatch({
  //     type: 'update-userInfo',
  //     payload: {
  //       userInfo: {
  //         ...userInfo,
  //         permissions: generatePermission("admin"),
  //       },
  //     },
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        {t['menu.profile.setting']}
      </Menu.Item>
      <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconExperiment className={styles['dropdown-icon']} />
            {t['message.seeMore']}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles['dropdown-icon']} />
          {t['menu.dashboard.workplace']}
        </Menu.Item>
        <Menu.Item key="card list">
          <IconInteraction className={styles['dropdown-icon']} />
          {t['menu.list.cardList']}
        </Menu.Item>
      </Menu.SubMenu>

      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="logout">
        <IconPoweroff className={styles['dropdown-icon']} />
        {t['navbar.logout']}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>Goal Admin</div>
        </div>
      </div>
      <ul className={styles.right}>
        {userInfo && (
          <li>
            {`您好: ` + userInfo.nickname}
          </li>
        )}
        <li>
          <MessageBox>
            <IconButton icon={<IconNotification />} />
          </MessageBox>
        </li>
        {userInfo && (
          <>
            <li>
              <Dropdown droplist={droplist} position="br" disabled={userLoading}>
                <Avatar size={32} style={{ cursor: 'pointer', backgroundColor: '#14a9f8' }}>
                  {userLoading ? (
                    <IconLoading />
                  ) : (
                    userInfo.avatar ? 
                    <img alt='avatar' src={userInfo.avatar} />
                    : userInfo.nickname
                  )}
                </Avatar>
              </Dropdown>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
