import mammoth from 'mammoth';
import path from 'path';
import { footer, navigation } from '@features/landing';
import {
  Card,
  CommonFooter,
  Container,
  HeaderWithOverlay,
  Navigation,
} from '@shared/UI';
import { APP_TYPES, DOCS } from '@shared/constants';

type Props = {
  navigation: typeof navigation;
  footer: typeof footer;
  doc: string;
};

const DOC_NAMES = {
  [DOCS.Privacy_Policy]: 'Политика_обработки_персональных_данных.docx',
  [DOCS.User_Agreement]: 'Пользовательское_соглашение_для_клиентов.docx',
  [DOCS.Consent_for_Clients_Personal_Data_Processing]:
    'Согласие_на_обработку_персональных_данных_для_клиентов.docx',
  [DOCS.Consent_for_Receiving_Advertising_Newsletters]:
    'Согласие_на_получение_рекламных_рассылок.docx',
  [DOCS.Consent_for_Specialists_Personal_Data_Processing]:
    'Согласие_на_обработку_персональных_данных_для_специалистов.docx',
  [DOCS.Services_Conditions]: 'Условия_оказания_услуг_для_специалистов.docx',
};

// export const getStaticPaths = () => {
//   return {
//     paths: Object.entries(DOCS).map(([, docName]) => {
//       const segments = docName.split('/');
//       return {
//         params: { doc_name: segments.length > 1 ? segments : [docName] },
//       };
//     }),
//     fallback: false,
//   };
// };

export const getServerSideProps = async ({ params }: AnyObject) => {
  const doc_name = (params?.doc_name as string[]).join('/');

  let doc;

  try {
    const result = await mammoth.convertToHtml({
      path: path.resolve(
        process.cwd(),
        `./public/docs/${DOC_NAMES[doc_name as DOCS]}`
      ),
    });

    doc = result.value;
  } catch (err) {
    doc = '<h1>Документ не найден</h1>';
  }

  return {
    props: {
      navigation,
      footer,
      doc,
      type: APP_TYPES.LANDING,
    },
  };
};

const Docs: FCC<Props> = ({ navigation, footer, doc }) => (
  <div className='relative bg-bg-primary'>
    <HeaderWithOverlay
      variant='secondary'
      className='z-20 max-md:fixed w-full'
      elements={() => <Navigation menus={navigation} className='ml-4 w-full' />}
    />
    <main>
      <Container className='grid-cols-6 md:grid-cols-12 grid py-24'>
        <Card variant='secondary' className='md:col-span-9 col-span-6'>
          <div
            dangerouslySetInnerHTML={{ __html: doc }}
            className='prose prose-zinc max-w-none md:prose-xl'
          ></div>
        </Card>
      </Container>
    </main>
    <CommonFooter menus={footer} />
  </div>
);

export default Docs;
