package controllers;

import java.util.Map;
import java.util.Objects;
import models.Imagen;
import play.mvc.Controller;
import play.mvc.With;
//TODO: 
//import javax.imageio.

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

    /**
     * Acción que sube una {@code Imagen}.
     *
     * @param imagen {@code Imagen} a subir
     */
    public static void upload(Imagen imagen) {
        
        Boolean isFileValid = Boolean.FALSE;
        try {
            isFileValid = imagen.wImagen.file.exists();
        } catch (Exception e) {
        }
        
        Boolean success = imagen.wImagen.validateAndSave() && imagen.validateAndSave();
        if (success) {
            flash.success("Se ha subido la imagen exitosamente.");
        } else {
            if (isFileValid) {
                imagen.wImagen.file.delete();
            }
            flash.error("No fue posible subir la imagen.");
        }
        admin();
    }

}
