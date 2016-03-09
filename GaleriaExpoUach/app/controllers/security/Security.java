package controllers.security;

import controllers.Administracion;

/**
 * Clase para manejo de la seguridad del sistema mediante autenticación.
 *
 * @author Edgar Hiram Hernández Reyes
 * @since Mar 9, 2016
 * @version 1
 */
public class Security extends controllers.Secure.Security {

    //TODO: Javadoc
    public static boolean authenticate(String username, String password) {
        //TODO: implementación correcta
        return "admin".equals(username) && "123098".equals(password);
    }

    //TODO: Javadoc
    public static void onAuthenticated() {
        Administracion.admin();
    }
}
