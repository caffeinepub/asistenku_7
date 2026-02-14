import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import LandingPage from './components/asistenku/LandingPage';
import LoginClient from './pages/client/LoginClient';
import RegisterClient from './pages/client/RegisterClient';
import LoginPartner from './pages/partner/LoginPartner';
import RegisterPartner from './pages/partner/RegisterPartner';
import InternalLogin from './pages/internal/InternalLogin';
import InternalRegister from './pages/internal/InternalRegister';
import SuperadminDashboard from './pages/superadmin/SuperadminDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AsistenmuDashboard from './pages/asistenmu/AsistenmuDashboard';
import ConciergeDashboard from './pages/concierge/ConciergeDashboard';
import StrategicPartnerDashboard from './pages/strategicpartner/StrategicPartnerDashboard';
import ManagementDashboard from './pages/management/ManagementDashboard';
import FinanceDashboard from './pages/finance/FinanceDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg rounded-3xl border-0">
        <CardHeader className="pt-8 pb-4">
          <CardTitle className="text-center text-4xl font-semibold text-gray-900">
            404
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pb-8 text-center">
          <p className="text-gray-600">Halaman tidak ditemukan.</p>
          <Link to="/">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-6">
              Kembali
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const clientLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/client/login',
  component: LoginClient,
});

const clientRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/client/register',
  component: RegisterClient,
});

const partnerLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner/login',
  component: LoginPartner,
});

const partnerRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner/register',
  component: RegisterPartner,
});

const internalLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/internal/login',
  component: InternalLogin,
});

const internalRegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/internal/register',
  component: InternalRegister,
});

const superadminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/superadmin/dashboard',
  component: SuperadminDashboard,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/dashboard',
  component: AdminDashboard,
});

const asistenmuDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/asistenmu/dashboard',
  component: AsistenmuDashboard,
});

const conciergeDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/concierge/dashboard',
  component: ConciergeDashboard,
});

const strategicpartnerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/strategicpartner/dashboard',
  component: StrategicPartnerDashboard,
});

const managementDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/management/dashboard',
  component: ManagementDashboard,
});

const financeDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/finance/dashboard',
  component: FinanceDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  clientLoginRoute,
  clientRegisterRoute,
  partnerLoginRoute,
  partnerRegisterRoute,
  internalLoginRoute,
  internalRegisterRoute,
  superadminDashboardRoute,
  adminDashboardRoute,
  asistenmuDashboardRoute,
  conciergeDashboardRoute,
  strategicpartnerDashboardRoute,
  managementDashboardRoute,
  financeDashboardRoute,
]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
