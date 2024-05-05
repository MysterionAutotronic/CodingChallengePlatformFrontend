import Navigation from './Navigation/Navigation';
import Layout from '../Layout/Layout';
import Footer from './Footer/Footer';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useAuthenticatedContext } from '../AuthenticatedContext';

export default function ContentWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const { authenticated, setAuthenticated } = useAuthenticatedContext();

    if (authenticated === null) {
        return <LoaderPage />;
    }

    return (
        <>
            {authenticated && <Navigation />}
            <Layout>{children}</Layout>
            <Footer />
        </>
    );
}
