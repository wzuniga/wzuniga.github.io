import App from './App';
import ErrorPage from './components/ErrorPage/ErrorPage';
import {PoliticPost1} from './components/Politics/Post1/Post1';
import {VarietyPost1} from './components/Varied/Post1/Post1';

const routesApp = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/blog",
        element: <App />,
    },
    {
        path: "/blog/variety",
        element: <VarietyPost1 />,
    },
    {
        path: "/blog/politics",
        element: <PoliticPost1 />,
    },
]

export default routesApp;