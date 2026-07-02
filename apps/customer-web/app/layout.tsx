import './styles.css';
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header>Northstar Customer Portal</header>{children}</body></html>;
}
