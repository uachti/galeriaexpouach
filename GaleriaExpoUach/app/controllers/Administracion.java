package controllers;

import play.mvc.Controller;
import play.mvc.With;

/**
 * Controlador para el área de administración de la galería.
 *
 * @author Edgar Hiram Hernández Reyes
 * @since Mar 9, 2016
 * @version 1
 */
@With(value = {Secure.class})
public class Administracion extends Controller {

    /**
     * Acción que muestra la vista de administración principal de la galería.
     */
    public static void admin() {
        render();
    }

}
