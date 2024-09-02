
import "./globals.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";

export const metadata = {
  title: "Sweet Surprises",
  description: "Welcome to Sweet Surprises",
}

export default async function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: `url(/background.jpg)`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          color: 'whitesmoke',
          fontSize: '1.5rem'
          // display: 'grid',
          // gridTemplateRows: '1fr auto',
        }}
      >
          <Header />
          <main style={{ flexGrow: 1 }}>
            {children}
          </main>


          <Footer />
      </body>
    </html >
  );
}

