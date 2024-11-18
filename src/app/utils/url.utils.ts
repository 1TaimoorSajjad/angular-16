import { environment } from "src/environments/environment"

export class urls {
    static SERVER_URL = environment.baseUrl
    static API_URL = environment.baseUrl + 'api/'  

    // User
    static SIGNIN_URL = 'auth/signin'
    static FORGOT_URL = 'auth/forgot'
    static PROFILE_URL = 'users/me'
    static CHANGE_PASSWORD_URL = 'users/password'
    static CHANGE_PROFILE_IMAGE = 'users/picture'

    

    // Staff
    static STAFF_URL = 'staffs'
    static STAFF_CREATE_URL = 'staffs/create'

    // Driver
    static DRIVERS_URL = 'drivers/companies'
    static ADD_DRIVER_URL = 'drivers'
    static DRIVER_RESET_PASSWORD_URL = 'drivers/resetpassword'

    // Company
    static GET_COMPANIES = 'companies'
    static DISPATCH_CENTER_HISTOR_URL = 'dispatches/company'

    // Trips
    static ASSIGN_TRIPS = 'assigns/trips'
    static SINGLE_TRIP = 'assigns/singletrip'

    // Notification
    static NOTIFICATIONS_URL = 'notifications'

    // Funding Source
    static FUNDING_SOURCE_LIST = 'cooperates'




}