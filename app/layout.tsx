import { getServerSession } from "next-auth/next";
import { getLocaleOnServer } from "@/i18n/server";
import { Providers } from "./providers";

import "./styles/globals.css";
import "./styles/markdown.scss";

const LocaleLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = getLocaleOnServer();
  const session = await getServerSession();

  return (
    <html lang={locale ?? "en"} className="h-full">
      <body className="h-full">
        <Providers session={session}>
          <div className="overflow-x-auto">
            <div className="w-screen h-screen min-w-[300px]">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default LocaleLayout;
