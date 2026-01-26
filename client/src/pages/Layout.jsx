import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadTheme } from '../features/themeSlice';
import { Loader2Icon } from 'lucide-react';
import {
    useUser,
    SignIn,
    useAuth,
    CreateOrganization,
    useOrganizationList,
} from '@clerk/clerk-react';
import { fetchWorkspaces } from '../features/workspaceSlice';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [fetchAttempted, setFetchAttempted] = useState(false);
    const { loading, workspaces } = useSelector((state) => state.workspace);
    const dispatch = useDispatch();
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const { organizationList, isLoaded: orgsLoaded } = useOrganizationList();

    // Initial load of theme
    useEffect(() => {
        dispatch(loadTheme());
    }, [dispatch]);

    // Initial load of workspaces and refetch when organizations change
    useEffect(() => {
        if (isLoaded && user && orgsLoaded && !fetchAttempted) {
            dispatch(fetchWorkspaces({ getToken }));
            setFetchAttempted(true);
        }
    }, [user, isLoaded, orgsLoaded, dispatch, getToken, fetchAttempted]);

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-white dark:bg-zinc-950">
                <SignIn />
            </div>
        );
    }

    // Show loading only if we haven't attempted to fetch yet
    if (loading && !fetchAttempted)
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-zinc-950">
                <Loader2Icon className="size-7 text-blue-500 animate-spin" />
            </div>
        );

    if (user && workspaces.length === 0 && fetchAttempted) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <CreateOrganization afterCreateOrganizationUrl="/" />
            </div>
        );
    }

    return (
        <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="flex-1 flex flex-col h-screen">
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <div className="flex-1 h-full p-6 xl:p-10 xl:px-16 overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
