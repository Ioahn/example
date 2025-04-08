import Script from 'next/script';
import * as process from 'process';
import { isProduction } from '@shared/utils';

export const VK = () => {
  if (!isProduction()) {
    return null;
  }

  return (
    <>
      <Script id='vk-metrika' strategy='lazyOnload'>
        {`var _tmr = window._tmr || (window._tmr = []);
          _tmr.push({id: "${process.env.NEXT_PUBLIC_VK_METRIKA_APP_ID}", type: "pageView", start: (new Date()).getTime()});
          (function (d, w, id) {
            if (d.getElementById(id)) return;
            var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
            ts.src = "https://top-fwz1.mail.ru/js/code.js";
            var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
            if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
           })(document, window, "tmr-code");
      `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://top-fwz1.mail.ru/counter?id=${process.env.NEXT_PUBLIC_VK_METRIKA_APP_ID};js=na`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt='Top.Mail.Ru'
          />
        </div>
      </noscript>
    </>
  );
};
