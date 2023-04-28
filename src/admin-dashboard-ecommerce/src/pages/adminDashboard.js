import '../css/admin.css'
import { useState, PureComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/dashbord.css'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import phone from '../images/phone.png'
import Cookies from "js-cookie"
import { useContext } from 'react';
const cookieValue = Cookies.get('access_token');
export const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Barear ${cookieValue}`
}
export const AdminDashboard = () => {

    
    const navigate = useNavigate();
    // const data = [
    //     { name: 'Jan', sales: 4000 },
    //     { name: 'Feb', sales: 3000 },
    //     { name: 'Mar', sales: 5000 },
    //     { name: 'Apr', sales: 2000 },
    //     { name: 'May', sales: 6000 },
    //     { name: 'Jun', sales: 4000 },
    // ];
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const [activeButton, setActiveButton] = useState('');

    const handleClick = (event) => {
        setActiveButton(event.target.textContent);
    };


    return (
        <div className='main-container'>
            <div className='main-title'>
                <h2>Dashboard</h2>
                <div className='date-title'>
                    <p>Home &gt; Dashboard</p>
                    <p><i className="fa-regular fa-calendar-days"></i> Feb 16,2022 - Feb 20,2022</p>
                </div>
            </div>
            <div className="orders-info">
                <div className="orders">
                    <div className="first-row">
                        <p>Total Orders</p>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="19" r="1" />
                            <circle cx="12" cy="5" r="1" />
                        </svg>
                    </div>
                    <div className="second-row">
                        <span>
                            <i class="fa-solid fa-bag-shopping"></i>
                        </span>
                        <span>$126.500</span>
                        <i class="fa-solid fa-arrow-up"></i>
                        <span>34.7%</span>
                    </div>
                    <p>Compared to Jan 2022</p>
                </div>
                <div className="orders">
                    <div className="first-row">
                        <p>Active Orders</p>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="19" r="1" />
                            <circle cx="12" cy="5" r="1" />
                        </svg>
                    </div>
                    <div className="second-row">
                        <span>
                            <i class="fa-solid fa-bag-shopping"></i>
                        </span>
                        <span>$126.500</span>
                        <i class="fa-solid fa-arrow-up"></i>
                        <span>34.7%</span>
                    </div>
                    <p>Compared to Jan 2022</p>
                </div>
                <div className="orders">
                    <div className="first-row">
                        <p>Shipped Orders</p>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="19" r="1" />
                            <circle cx="12" cy="5" r="1" />
                        </svg>
                    </div>
                    <div className="second-row">
                        <span>
                            <i class="fa-solid fa-bag-shopping"></i>
                        </span>
                        <span>$126.500</span>
                        <i class="fa-solid fa-arrow-up"></i>
                        <span>34.7%</span>
                    </div>
                    <p>Compared to Jan 2022</p>
                </div>
            </div>

            {/* start graph section */}

            <div className="sales">
                <div className="graph-container">
                    <div className="graph-header">
                        <h3>Sale Graph</h3>
                        <div className="timing">
                            <button className={activeButton === 'Weekly' ? 'active' : ''} onClick={handleClick}>Weekly</button>
                            <button className={activeButton === 'Monthly' ? 'active' : ''} onClick={handleClick}>Monthly</button>
                            <button className={activeButton === 'Yearly' ? 'active' : ''} onClick={handleClick}>Yearly</button>
                        </div>
                    </div>
                    {/* <LineChart width={550} height={300} data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart> */}
                    <ResponsiveContainer width="100%" height="50%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="bs-container">
                    <div className="header">
                        <h3>Best Sellers</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-dots-vertical" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="19" r="1" />
                            <circle cx="12" cy="5" r="1" />
                        </svg>
                    </div>
                    <div className='product-container'>
                        <div className="img-container">
                            <img src={phone} alt="the phone image" />
                        </div>
                        <div className="product-infos">
                            <h4>Iphone 14 Pro</h4>
                            <p>$126.50</p>
                        </div>
                        <div className="product-numbers">
                            <h4>$126.00</h4>
                            <p>999 sales</p>
                        </div>

                    </div>
                    <div className='product-container'>
                        <div className="img-container">
                            <img src={phone} alt="the phone image" />
                        </div>
                        <div className="product-infos">
                            <h4>Iphone 14 Pro</h4>
                            <p>$126.50</p>
                        </div>
                        <div className="product-numbers">
                            <h4>$126.00</h4>
                            <p>999 sales</p>
                        </div>

                    </div>
                    <div className='product-container'>
                        <div className="img-container">
                            <img src={phone} alt="the phone image" />
                        </div>
                        <div className="product-infos">
                            <h4>Iphone 14 Pro</h4>
                            <p>$126.50</p>
                        </div>
                        <div className="product-numbers">
                            <h4>$126.00</h4>
                            <p>999 sales</p>
                        </div>

                    </div>
                    <div className='product-container'>
                        <div className="img-container">
                            <img src={phone} alt="the phone image" />
                        </div>
                        <div className="product-infos">
                            <h4>Iphone 14 Pro</h4>
                            <p>$126.50</p>
                        </div>
                        <div className="product-numbers">
                            <h4>$126.00</h4>
                            <p>999 sales</p>
                        </div>

                    </div>
                    <button>Report</button>


                </div>
            </div>


        </div>



    )
}