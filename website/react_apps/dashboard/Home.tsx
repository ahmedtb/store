import React from 'react'
import { routes, api } from './functions/urls'
import { connect } from "react-redux"
import { trackPromise } from "react-promise-tracker"
import apiCallHandler from '../functions/apiCallHandler'
import LoadingIndicator from '../components/LoadingIndicator'
import moment from 'moment';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import LoginPage from './LoginPage'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Home(props) {


    if(!props.admin)
        return <LoginPage />

    const [homeStatistics, sethomeStatistics] = React.useState<{
        orderCreatedActivities: {},
        orderOrderedActivities: {},
        orderAcceptedActivities: {},
        orderRejectedActivities: {},
        orderPaidActivities: {},

    }>()

    function fetch(params: object) {
        return api.ordersStatistics(params)
    }

    React.useEffect(() => {
        trackPromise(
            apiCallHandler(
                () => fetch({}),
                (data) => {
                    sethomeStatistics(data);
                },
                'Home',
                true
            )
            , 'orders statistics')
    }, [])


    function during(amount, period) {
        trackPromise(
            apiCallHandler(
                () => fetch({ from_date: moment().subtract(amount, period).format('Y-MM-DD H:m:s') }),
                (data) => {
                    sethomeStatistics(data);
                },
                'filtering from ' + moment().subtract(amount, period).format('Y-MM-DD H:m:s'),
                true
            )
            , 'orders statistics')
    }


    return <div className="bg-white">
        <div className='fs-4 p-2 m-2'>إحصائيات انشطة الطالبات</div>
        <div className='d-flex justify-content-around'>
            <button className='btn btn-primary' onClick={() => during(15, 'hour')}>خلال يوم</button>
            <button className='btn btn-primary' onClick={() => during(1, 'week')}>خلال أسبوع</button>
            <button className='btn btn-primary' onClick={() => during(1, 'month')}>خلال شهر</button>
        </div>
        <LoadingIndicator area='orders statistics' />

        <div className='mx-auto w-50'>
            <Bar
                data={{
                    // Name of the variables on x-axies for each bar
                    labels: ["سلات أنشأتها", "طلبات ", "طلبات قبلتها", "طلبات رفضتها", "طلبات دفعت"],
                    datasets: [
                        {
                            // Label for bars
                            label: "إحصائيات عمليات الطلبات",
                            // Data or value of your each variable
                            data: [homeStatistics?.orderCreatedActivities, homeStatistics?.orderOrderedActivities, homeStatistics?.orderAcceptedActivities, homeStatistics?.orderRejectedActivities, homeStatistics?.orderPaidActivities],
                            // Color of each bar
                            backgroundColor: ["brown", "yellow", "aqua", "green", "red"],
                            // Border color of each bar
                            borderColor: ["brown", "yellow", "aqua", "green", "red"],
                            borderWidth: 0.5,
                        },
                    ],
                }}
                // Height of graph
                height={700}
                options={{
                    maintainAspectRatio: false,
                    // scales: {
                    //     yAxes: [
                    //         {
                    //             ticks: {
                    //                 // The y-axis value will start from zero
                    //                 beginAtZero: true,
                    //             },
                    //         },
                    //     ],
                    // },
                    // legend: {
                    //     labels: {
                    //         fontSize: 15,
                    //     },
                    // },
                }}
            />
        </div>
    </div>

}

const mapStateToProps = state => {
    return {
        admin: state.state.admin,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)