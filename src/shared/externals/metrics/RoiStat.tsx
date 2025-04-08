import Script from 'next/script';
import { isProduction } from '@shared/utils';

export const RoiStat = () => {
  if (!isProduction()) {
    return null;
  }

  return (
    <>
      <Script id='roi-stat' strategy='lazyOnload'>
        {`function(w, d, s, h, id) {
    w.roistatProjectId = id; w.roistatHost = h;
    var p = d.location.protocol == "https:" ? "https://" : "http://";
    var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? "/dist/module.js" : "/api/site/1.0/"+id+"/init?referrer="+encodeURIComponent(d.location.href);
    var js = d.createElement(s); js.charset="UTF-8"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);
})(window, document, 'script', 'cloud.roistat.com', 'e6dee06365c1eebf1017524d153e0f2c');
      `}
      </Script>
    </>
  );
};
