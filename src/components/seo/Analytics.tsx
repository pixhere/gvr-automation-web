import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Google Analytics 4 + Microsoft Clarity, loaded only when their env
 * vars are set (NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_CLARITY_ID). Absent
 * either var, nothing renders — no broken tracking calls, no console
 * errors. See /README.md "Analytics".
 */
export function Analytics() {
  return (
    <>
      {siteConfig.analytics.ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.analytics.ga4Id}');
            `}
          </Script>
        </>
      )}
      {siteConfig.analytics.clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${siteConfig.analytics.clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
