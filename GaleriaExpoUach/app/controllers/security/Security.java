package controllers.security;

import controllers.Administracion;
import controllers.Application;

/**
 * Clase para manejo de la seguridad del sistema mediante autenticación.
 *
 * @author Edgar Hiram Hernández Reyes
 * @since Mar 9, 2016
 * @version 1
 */
public class Security extends controllers.Secure.Security {

    private static final String DEFAULT_USERNAME = "admin";
    private static final String DEFAULT_PASSWORD = "123098";

    /**
     * Verifica las credenciales de un usuario para iniciar sesión.
     *
     * @param username {@code String} con el username
     * @param password {@code String} con el password
     * @return {@code true} si las credenciales son correctas
     */
    public static boolean authenticate(String username, String password) {
        boolean allowed = DEFAULT_USERNAME.equals(username)
                && DEFAULT_PASSWORD.equals(password);
        if (!allowed) {
            Application.index();
        }
        //TODO: implementación correcta
        return allowed;
    }

    /**
     * Tras iniciar sesión, redirige a la acción de
     * {@link Administracion#admin()};
     */
    public static void onAuthenticated() {
        Administracion.admin();
    }

    /**
     * Verifica si un usuario con sesión iniciada tiene acceso a cierta parte
     * del sistema.
     *
     * @param profile {@code String} que identifica la funcionalidad
     * @return {@code true} si se permite el acceso
     */
    public static boolean check(String profile) {
        return true;
    }

    /**
     * Tras cerrar sesión, redirige a la acción de {@link Application#index()}.
     */
    public static void onDisconnected() {
        Application.index();
    }
}
