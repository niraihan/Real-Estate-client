import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layOut/MainLayout";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import AllProperties from "../pages/AllProperties";
import PropertyDetails from "../pages/PropertyDetails";
import Wishlist from "../pages/Wishlist";
import NotFound from "../components/NotFound";

import Dashboard from "../components/Dashboard";
import MyProfile from "../pages/profile/MyProfile";
import MakeOffer from "../pages/MakeOffer";
import PropertyBought from "../pages/PropertyBought";
import PaymentPage from "../pages/PaymentPage";
import MyReviews from "../pages/MyReviews";

import AgentDashboardLayout from "../layOut/AgentDashboardLayout";
import AgentRoute from "./AgentRoute";
import AddProperty from "../pages/AddProperty";
import MyAddedProperties from "../pages/MyAddedProperties";
import UpdateProperty from "../pages/UpdateProperty";
import MySoldProperties from "../pages/MySoldProperties";
import RequestedProperties from "../pages/RequestedProperties";

import AdminDashboard from "../layOut/AdminDashboard";
import AdminRoute from "./AdminRoute";
import AdminProfile from "../pages/profile/AdminProfile";
import ManageProperties from "../pages/adminControl/ManageProperties";
import ManageReviews from "../pages/adminControl/ManageReviews";
import ManageUsers from "../pages/adminControl/ManageUsers";
import AdvertiseProperty from "../pages/adminControl/AdvertiseProperty";
import ReportedProperties from "../pages/ReportedProperties";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "loginRegister",
                element: <LoginRegister />
            },
            {
                path: "all-properties",
                element: (
                    
                        <AllProperties />
                )
            },
            {
                path: "property/:id",
                element: (
                    <PrivateRoute>
                        <PropertyDetails />
                    </PrivateRoute>
                )
            },

            // User Dashboard Routes
            {
                path: "dashboard",
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
                children: [
                    // {
                    //     index: true,
                    //     element: <MyProfile />
                    // },
                    {
                        path: "profile",
                        element: <MyProfile />
                    },
                    {
                        path: "wishlist",
                        element: <Wishlist />
                    },
                    {
                        path: "make-offer/:id",
                        element: <MakeOffer />
                    },
                    {
                        path: "property-bought",
                        element: <PropertyBought />
                    },
                    {
                        path: "payment/:offerId",
                        element: <PaymentPage />
                    },
                    {
                        path: "my-reviews",
                        element: <MyReviews />
                    }
                ]
            },

            // Agent Dashboard Routes
            {
                path: "dashboard",
                element: (
                    <AgentRoute>
                        <AgentDashboardLayout />
                    </AgentRoute>
                ),
                children: [
                    { path: "add-property", element: <AddProperty /> },
                    { path: "my-added-properties", element: <MyAddedProperties /> },
                    { path: "update-property/:id", element: <UpdateProperty /> },
                    { path: "my-sold-properties", element: <MySoldProperties /> },
                    { path: "requested-properties", element: <RequestedProperties /> }
                ]
            },

            // Admin Dashboard Routes
            {
                path: "dashboard",
                element: (
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                ),
                children: [
                    { path: "admin-profile", element: <AdminProfile /> },
                    { path: "add-property", element: <AddProperty /> },
                    { path: "manage-properties", element: <ManageProperties /> },
                    { path: "manage-users", element: <ManageUsers /> },
                    { path: "manage-reviews", element: <ManageReviews /> },
                    { path: "advertise-property", element: <AdvertiseProperty /> },
                    { path: "reported-properties", element: <ReportedProperties /> }
                ]
            }
        ]
    }
]);

export default router;






















// import { createBrowserRouter } from "react-router";
// import MainLayout from "../layOut/MainLayout";
// import LoginRegister from "../pages/LoginRegister/LoginRegister";
// import Home from "../pages/Home/Home";
// import PrivateRoute from "./PrivateRoute";
// import AllProperties from "../pages/AllProperties";
// import PropertyDetails from "../pages/PropertyDetails";
// import Wishlist from "../pages/Wishlist";
// import NotFound from "../components/NotFound";
// import Dashboard from "../components/Dashboard";
// import MakeOffer from "../pages/MakeOffer";
// import PropertyBought from "../pages/PropertyBought";
// import PaymentPage from "../pages/PaymentPage";
// import MyReviews from "../pages/MyReviews";
// import AddProperty from "../pages/AddProperty";

// import AgentDashboardLayout from "../layOut/AgentDashboardLayout";
// import AgentRoute from "./AgentRoute";
// import MyAddedProperties from "../pages/MyAddedProperties";
// import UpdateProperty from "../pages/UpdateProperty";
// import MySoldProperties from "../pages/MySoldProperties";
// import RequestedProperties from "../pages/RequestedProperties";
// import AdminDashboard from "../layOut/AdminDashboard";
// import AdminRoute from "./AdminRoute";
// import AdminProfile from "../pages/profile/AdminProfile";
// import ManageProperties from "../pages/adminControl/ManageProperties";
// import ManageReviews from "../pages/adminControl/ManageReviews";
// import ManageUsers from "../pages/adminControl/ManageUsers";
// import AdvertiseProperty from "../pages/adminControl/AdvertiseProperty";
// import ReportedProperties from "../pages/ReportedProperties";
// import MyProfile from "../pages/profile/MyProfile";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <MainLayout />,
//         errorElement: <NotFound />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />
//             },
//             {
//                 path: "/loginRegister",
//                 element: <LoginRegister />
//             },
//             {
//                 path: "/all-properties",
//                 element: (
//                     <PrivateRoute>
//                         <AllProperties />
//                     </PrivateRoute>
//                 )
//             },
//             {
//                 path: "/property/:id",
//                 element: (
//                     <PrivateRoute>
//                         <PropertyDetails />
//                     </PrivateRoute>
//                 )
//             },
//             {
//                 path: "/dashboard",
//                 element: <PrivateRoute>
//                     <Dashboard />
//                 </PrivateRoute>,
//                 children: [
//                     {
//                         path: "profile",
//                         element: <MyProfile/>
//                     },
//                     {
//                         path: "wishlist",
//                         element: <Wishlist />
//                     },
//                     {
//                         path: "make-offer/:id",
//                         element: (
//                             <PrivateRoute>
//                                 <MakeOffer />
//                             </PrivateRoute>
//                         )
//                     },
//                     {
//                         path: "/dashboard/property-bought",
//                         element: (
//                             <PrivateRoute>
//                                 <PropertyBought />
//                             </PrivateRoute>
//                         )
//                     },
//                     {
//                         path: "/dashboard/payment/:offerId",
//                         element: (
//                             <PrivateRoute>
//                                 <PaymentPage />
//                             </PrivateRoute>
//                         )
//                     },

//                     {
//                         path: "/dashboard/my-reviews",
//                         element: (
//                             <PrivateRoute>
//                                 <MyReviews />
//                             </PrivateRoute>
//                         )
//                     },
//                     {
//                         path: "/dashboard/agent",
//                         element: (
//                             <AgentRoute>
//                                 <AgentDashboardLayout />
//                             </AgentRoute>
//                         ),
//                         children: [
//                             {
//                                 path: "add-property",
//                                 element: <AddProperty />
//                             },
//                             {
//                                 path: "my-added-properties",
//                                 element: <MyAddedProperties />
//                             },
//                             {
//                                 path: "update-property/:id",
//                                 element: <UpdateProperty />
//                             },
//                             {
//                                 path: "my-sold-properties",
//                                 element: <MySoldProperties></MySoldProperties>

//                             },
//                             {
//                                 path: "requested-properties",
//                                 element: <RequestedProperties></RequestedProperties>

//                             },

//                         ]
//                     }

//                     // {
//                     //     path: "bought",
//                     //     element: <BoughtProperties />
//                     // },
//                     // {
//                     //     path: "reviews",
//                     //     element: <MyReviews />
//                     // },
//                     // {
//                     //     path: "add-property",
//                     //     element: <AddProperty />
//                     // },

//                 ]
//             },
//             {
//                 path: "/dashboard",
//                 element: <PrivateRoute>
//                     <AdminDashboard />
//                 </PrivateRoute>,
//                 children: [
//                     {
//                         path: "admin-profile",
//                         element: <AdminRoute><AdminProfile /></AdminRoute>
//                     },
//                     {
//                         path: "manage-properties",
//                         element: <AdminRoute><ManageProperties /></AdminRoute>
//                     },
//                     {
//                         path: "manage-users",
//                         element: <AdminRoute><ManageUsers /></AdminRoute>
//                     },
//                     {
//                         path: "manage-reviews",
//                         element: <AdminRoute><ManageReviews /></AdminRoute>
//                     },
//                     {
//                         path: "advertise-property",
//                         element: <AdminRoute><AdvertiseProperty /></AdminRoute>
//                     },
//                     {
//                         path: "reported-properties",
//                         element: <AdminRoute><ReportedProperties /></AdminRoute>
//                     }
//                 ]
//             }

//             // {
//             //     path: "/dashboard/wishlist",
//             //     element: (
//             //         <PrivateRoute>
//             //             <Wishlist />
//             //         </PrivateRoute>
//             //     )
//             // },
//         ]
//     }
// ]);
// export default router;