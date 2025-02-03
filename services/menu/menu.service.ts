import { MenuProps } from '@/types/menu.types';
import { NavItemType } from '@/types/navbar.types';
import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../server';

const initialState: MenuProps = {
	isDashboardDrawerOpened: false,
};

export const endpoints = {
	key: 'api/menu',
	master: 'master',
	widget: '/widget',
};

function useGetMenu() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.widget, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
      () => ({
          menu: data?.widget as NavItemType,
          menuLoading: isLoading,
          menuError: error,
          menuValidating: isValidating,
          menuEmpty: !isLoading && !data?.length
      }),
      [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

function useGetMenuMaster() {
	const { data, isLoading } = useSWR(
		endpoints.key + endpoints.master,
		() => initialState,
		{
			revalidateIfStale: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	const memoizedValue = useMemo(
		() => ({
			menuMaster: data as MenuProps,
			menuMasterLoading: isLoading,
		}),
		[data, isLoading],
	);

	return memoizedValue;
}

function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
	mutate(
		endpoints.key + endpoints.master,
		(currentMenuMaster: MenuProps | undefined) => {
			return { ...currentMenuMaster, isDashboardDrawerOpened };
		},
		false,
	);
}

export const menuService = { useGetMenuMaster, handlerDrawerOpen, useGetMenu };
