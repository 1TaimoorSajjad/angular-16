export enum Events {
    GET_APPROCHING_TRIPS = 'getDispatchApproachingTrips',
    GET_COMPANY_DRIVER_STATUS = 'companyDriversStatus',
    SEND_EXPIRE_DISPATCH = 'sendExpireDispatch',
    SEND_DISPATCH_TRIP_CALL = 'newDispatchCall',
    RE_DISPATCH_TRIP_CALL = 'recallDispatchCall',
    GET_MILES_CALL = 'assignTripManualFormETA',
    GET_ADJUSTMENT_ESTIMATIONS_CALL = 'getAdjustmentEstimations',
    GET_DRIVER_MILES_FOR_ASSIGN_MODAL = 'assignTripManualFormETA',
    UPDATE_ASSIGN_TRIP = 'updateAssignedJob',
    DROP_TRIP = 'dropTrip',
    DRIVER_ALERT_CALL = 'newAlertSender',
    RECEIVE_DRIVER_ALERT_MESSAGE_CALL = 'newAlertReceiver',

    GET_MARKED_TRIPS= 'getMarkedTrips',
    SOON_EXPIRING_TRIPS= 'soonExpiringTrips',
    GET_ESTIMATED_FARE = 'checkDispatchEstimatedFare',
    GET_DRIVER_ESTIMATED_FARE = 'getCompanyDriverEstimatedFare',
    GET_ASSIGN_TRIP_ETA = 'assignTripEta'
}
