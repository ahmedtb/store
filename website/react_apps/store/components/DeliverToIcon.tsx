import React from 'react'
import { connect } from "react-redux"
import { Dispatch } from 'redux';
import { updateGPS } from '../redux/stateFunctions';

function DeliverToIcon(props: { GPS: GPS }) {

    React.useEffect(() => {
        updateGPS()
    }, [])

    return <div>
        <div>Deliver To</div>
        <div style={{ fontSize: 12 }}>{props.GPS ? 'your GPS location' : 'your GPS not known'}</div>
    </div>

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