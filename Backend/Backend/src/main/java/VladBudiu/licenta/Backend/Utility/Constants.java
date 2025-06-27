package VladBudiu.licenta.Backend.Utility;

public final class Constants {

    //public endpoints
    public static final class PulbicEndPoints
    {
        public final static String DEFAULT = "/";
        public final static String SIGN_UP = "/signup";
        public final static String CHANGE_PASSWORD = "/changepassword";
        public final static String RESET_PASSWORD = "/resetpassword";
        public final static String LOGIN = "/login";

        public final static String GET_RESET_EMAIL = "/getresetemail";
        public final static String CONFIRMATION_CODE = "/confirmationcode";
        public final static String ERROR = "/error";
        public final static String CREATE_ACCOUNT= "/signup/createAccount";
        public final static String REFRESH_TOKEN = "/auth/refresh";
    }

}
