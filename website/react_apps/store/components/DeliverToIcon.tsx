import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import CustomModal from '../../components/CustomModal';
import { updateGPS } from '../redux/stateFunctions';

function DeliverToIcon(props: { GPS: GPS }) {

    React.useEffect(() => {
        updateGPS()
    }, [])

    // return <div>
    //     <div>Deliver To</div>
    //     <div style={{ fontSize: 12 }}>{props.GPS ? 'your GPS location' : 'your GPS not known'}</div>
    // </div>

    return <CustomModal label={<div>
        <div>Deliver To</div>
        <div style={{ fontSize: 12 }}>{props.GPS ? 'your GPS location' : 'your GPS not known'}</div>
    </div>} useDiv={true}
    >
        <div>your orders will be delivered to this location, specified by the GPS</div>
        <iframe className='w-75' src={"https://maps.google.com/maps?q=" + props.GPS?.lat + ",%20" + props.GPS?.long + "&t=&z=13&ie=UTF8&iwloc=&output=embed"}></iframe>

    </CustomModal>
}

const mapStateToProps = (state: { state: storeState }) => {
    return {
        GPS: state.state.GPS,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeliverToIcon)