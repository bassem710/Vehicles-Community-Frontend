import React from "react";

import AddCar from "../../components/admin/AddCar";
import AddEvent from "../../components/admin/AddEvent";
import AddNews from "../../components/admin/AddNews";
import "bootstrap/dist/css/bootstrap.css";

const AdminPanel = () => {
    return (
        <div className="admin container-lg my-3 px-4">
            <h2 className="text-center p-1">Admin Panel</h2>
            <div className="row">
                {/* Add car */}
                <AddCar />
                {/* Add event */}
                <AddEvent />
                {/* Add news */}
                <AddNews />
            </div>
        </div>
    );
};

export default AdminPanel;
