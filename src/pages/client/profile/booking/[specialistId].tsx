import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import {
  getClientPaymentMethodThunkSSR,
  getSpecialistsProfileThunkSSR,
  setClientActiveArea,
  setClientActivePriceTab,
  setPurchasedSlots,
} from '@entities/models';
import { TAreaType } from '@shared/api';
import { CommonPage } from '@shared/UI';
import { PRICE_OPTIONS } from '@shared/constants';

const DynamicClientBooking = dynamic(() =>
  import('@features/client').then(({ ClientBooking }) => ClientBooking)
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const id = ctx.params?.specialistId as string;
    const query = ctx.query;

    if (query.option) {
      store.dispatch(
        setClientActivePriceTab(query.option as keyof typeof PRICE_OPTIONS)
      );
    }

    if (query.id) {
      const ids = (query.id as string).split(',');
      store.dispatch(
        setPurchasedSlots(ids.length > 1 ? ids : (ids.at(0) as string))
      );
    }

    if (query.area) {
      store.dispatch(setClientActiveArea(query.area as TAreaType));
    }

    await store.dispatch(
      getSpecialistsProfileThunkSSR({
        id,
        areaType: query.area as TAreaType | undefined,
      })
    );

    await store.dispatch(getClientPaymentMethodThunkSSR());

    return {
      props: {},
    };
  }
);

const ClientBooking = () => <DynamicClientBooking />;

ClientBooking.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default ClientBooking;
