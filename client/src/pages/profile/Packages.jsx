import React from 'react';

const Packages = () => {
    return (
        <div className="bg-blue-200 p-4 w-full">
            <table className="table-auto w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th>No</th>
                        <th>Booking No</th>
                        <th>Guest Name</th>
                        <th>Package</th>
                        <th>Paid Amount</th>
                        <th>Unpaid Amount</th>
                        <th>Edit</th>
                        <th>Active</th>
                        <th>Done</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-blue-100">
                        <td>1</td>
                        <td>1234</td>
                        <td>John Doe</td>
                        <td>Umrah Package</td>
                        <td>$2000</td>
                        <td>$500</td>
                        <td><button className="bg-blue-600 text-white p-1 rounded">Edit</button></td>
                        <td><button className="bg-green-500 text-white p-1 rounded">Active</button></td>
                        <td><button className="bg-gray-400 text-white p-1 rounded">Done</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Packages;
