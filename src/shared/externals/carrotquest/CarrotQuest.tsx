import Script from 'next/script';

export const CarrotQuest = () => {
  return (
    <Script id='carrot-quest' strategy='lazyOnload'>
      {`!function(){function t(t,e){return function(){window.carrotquestasync.push(t,arguments)}}if("undefined"==typeof carrotquest){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://cdn.carrotquest.app/api.min.js",document.getElementsByTagName("head")[0].appendChild(e),window.carrotquest={},window.carrotquestasync=[],carrotquest.settings={};for(var n=["connect","track","identify","auth","onReady","addCallback","removeCallback","trackMessageInteraction"],a=0;a<n.length;a++)carrotquest[n[a]]=t(n[a])}}(),carrotquest.connect("61371-64416d7c9cdacbad5a1297047c");`}
    </Script>
  );
};
