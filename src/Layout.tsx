import 'Layout.css';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <div className="layout">
    {children}
  </div>
);

export default Layout;
