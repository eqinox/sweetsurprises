import Header from "@/app/components/header/header";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { getBackgroundImageUrl } from "@/utils/data-fetcher";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default async function RootLayout({ children }) {
  const backgroundImageUrl = await getBackgroundImageUrl();

  return (
    <html lang="en">
      <body
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      >
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

