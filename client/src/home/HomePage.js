// @flow strict

import type {Element} from 'react';

import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import HomeTab from './HomeTab';
import Page from '../component/Page';
import TimesheetsTab from './TimesheetsTab';

import {fetchLogout} from '../api/login';

const tabMap = {
  home: HomeTab,
  timesheets: TimesheetsTab,
};

type Tab = 'home' | 'timesheets';

function HomePage(): Element<typeof Page> {
  const [tab, setTab] = useState<Tab>('home');
  const logout = useCallback(
    async (): Promise<void> => {
      const {error} = await fetchLogout();
      if (!error) {
        window.location.reload();
      }
    },
    [],
  );
  const goToHomeTab = useCallback(
    (): void => {
      setTab('home');
    },
    [],
  );
  const goToTimesheetsTab = useCallback(
    (): void => {
      setTab('timesheets');
    },
    [],
  );
  const TabRenderer = tabMap[tab];
  return (
    <Page>
      <Sidebar>
        <SidebarItem onClick={goToHomeTab}>
          Home
        </SidebarItem>
        <SidebarItem onClick={goToTimesheetsTab}>
          Timesheets
        </SidebarItem>
        <SidebarItem onClick={logout}>
          Logout
        </SidebarItem>
      </Sidebar>
      <Content>
        <TabRenderer />
      </Content>
    </Page>
  );
};

const Content = styled.div`
  align-items: center;
  background-color: #202020;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  padding: 20px;
`;

const Sidebar = styled.div`
  background-color: #2C2C2C;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  width: 300px;
`;

const SidebarItem = styled.div`
  align-items: center;
  background-color: #ee0060;
  border-radius: 8px;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: flex;
  font-weight: bold;
  height: 50px;
  margin-top: 20px;
  padding: 10px;
  width: 100%;
  &:first-child {
    margin-top: 0;
  }
`;

export default HomePage;
